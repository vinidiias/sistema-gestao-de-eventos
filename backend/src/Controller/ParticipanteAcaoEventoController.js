const pool = require('../conexao');

module.exports = {
    async create(req, res) {
        const { idAcao, idEvento, idParticipante } = req.params;
    
        try {
            // Consultar o número total de vagas na ação
            const numVagasResult = await pool.query(
                `SELECT numVagas FROM Acao WHERE idAcao = $1`,
                [idAcao]
            );
            const numVagas = numVagasResult.rows[0].numvagas;
    
            // Consultar o número de vagas preenchidas no evento/ação
            const vagasPreenchidasResult = await pool.query(
                `SELECT vagasPreenchidas FROM AcaoEvento WHERE idEvento = $1 AND idAcao = $2`,
                [idEvento, idAcao]
            );
            const vagasPreenchidas = vagasPreenchidasResult.rows[0].vagaspreenchidas;
    
            // Verificar se as vagas estão esgotadas
            if (vagasPreenchidas >= numVagas) {
                return res.status(400).json({ message: 'Total de vagas já preenchidas' });
            }
    
            // Confirmar a inscrição
            const status = "Confirmado";
            const data = new Date();
    
            const result = await pool.query(
                `INSERT INTO ParticipanteAcaoEvento (idAcao, idEvento, idParticipante, statusInscricao, dataInscricao)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING *`,
                [idAcao, idEvento, idParticipante, status, data]
            );
    
            // Atualizar o número de vagas preenchidas
            const novasVagasPreenchidas = vagasPreenchidas + 1;
            await pool.query(
                `UPDATE AcaoEvento 
                 SET vagasPreenchidas = $1 
                 WHERE idEvento = $2 AND idAcao = $3`,
                [novasVagasPreenchidas, idEvento, idAcao]
            );
    
            // Retornar o resultado da inscrição
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Erro', error: err.message });
        }
    },

    async listAcoesEventosPorParticipante(req, res) {
        const { idparticipante } = req.params;
        
        try {
            // Verificar se o participante existe
            const participanteResult = await pool.query(
                'SELECT idparticipante FROM Participante WHERE idparticipante = $1',
                [idparticipante]
                
            );
            console.log(idparticipante)
    
            if (participanteResult.rowCount === 0) {
                return res.status(404).json({ message: 'Participante não encontrado' });
            }
    
            const result = await pool.query(
                `SELECT 
                    pae.idParticipante,
                    p.nomeParticipante,
                    e.idEvento,
                    e.nomeEvento,
                    a.idAcao,
                    a.nomeAcao,
                    a.valor,
                    a.numVagas,
                    t.nomeTipoAcao,
                    pae.statusInscricao,
                    pae.dataInscricao
                 FROM 
                    ParticipanteAcaoEvento pae
                 INNER JOIN 
                    Participante p ON pae.idParticipante = p.idParticipante
                 INNER JOIN 
                    Evento e ON pae.idEvento = e.idEvento
                 INNER JOIN 
                    Acao a ON pae.idAcao = a.idAcao
                 INNER JOIN 
                    TipoAcao t ON a.idTipoAcao = t.idTipoAcao
                 WHERE 
                    pae.idParticipante = $1`,
                [idparticipante]
            );
            
    
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Nenhuma ação ou evento encontrado para este participante' });
            }
    
            // Retornar as ações e eventos associados ao participante
            return res.status(200).json(result.rows);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar ações e eventos do participante', error: err.message });
        }
    }
}
