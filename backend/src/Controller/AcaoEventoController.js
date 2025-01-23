const pool = require("../conexao");

module.exports = {
    async create (req, res){
        const { idEvento, idAcao } = req.params
        const {dataInicio, dataFim, horario} = req.body
        const vagasPreenchidas = 0

        try {
            // Verificar se o participante existe
            const acaoResult = await pool.query(
                `SELECT idAcao FROM Acao WHERE idAcao = $1`, 
                [idAcao]
            );
            if (acaoResult.rowCount === 0) {
                return res.status(400).json({ message: 'Acao não foi encontrado' });
            }
    
            // Verificar se o evento existe
            const eventoResult = await pool.query(
                `SELECT idEvento FROM Evento WHERE idEvento = $1`, 
                [idEvento]
            );
            if (eventoResult.rowCount === 0) {
                return res.status(400).json({ message: 'Evento não foi encontrado' });
            }

            const result = await pool.query(
                `INSERT INTO AcaoEvento 
                (idEvento, idAcao, dataInicio, dataFim, vagasPreenchidas, horario) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING *`, 
                [idEvento, idAcao, dataInicio, dataFim, vagasPreenchidas, horario]
            );
    
            // Retornar a confirmação
            res.status(201).json(result.rows[0]);

            
        }catch (err) {
            console.error(err); // Logar o erro para depuração
            res.status(400).json({ message: 'Erro ao confirmar participante no evento', error: err.message });
        }
    },

    async update(req, res) {
        const { idEvento, idAcao } = req.params;
        const { dataInicio, dataFim } = req.body;
    
        try {
            // Verificar se a ação do evento existe
            const acaoEventoResult = await pool.query(
                `SELECT * FROM AcaoEvento WHERE idEvento = $1 AND idAcao = $2`,
                [idEvento, idAcao]
            );
            if (acaoEventoResult.rowCount === 0) {
                return res.status(404).json({ message: 'Ação do evento não encontrada' });
            }
    
            // Atualizar as datas
            const result = await pool.query(
                `UPDATE AcaoEvento 
                 SET dataInicio = COALESCE($1, dataInicio), 
                     dataFim = COALESCE($2, dataFim) 
                 WHERE idEvento = $3 AND idAcao = $4 
                 RETURNING *`,
                [dataInicio, dataFim, idEvento, idAcao]
            );
    
            return res.status(200).json({
                message: 'Datas atualizadas com sucesso',
                acaoEvento: result.rows[0]
            });
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao atualizar as datas', error: err.message });
        }
    },

    async index(req, res) {
        const { idEvento } = req.params;
    
        try {
            // Verificar se o evento existe
            const eventoResult = await pool.query(
                `SELECT idEvento FROM Evento WHERE idEvento = $1`,
                [idEvento]
            );
            if (eventoResult.rowCount === 0) {
                return res.status(404).json({ message: 'Evento não encontrado' });
            }
    
            // Listar todas as ações vinculadas ao evento
            const result = await pool.query(
                `SELECT ae.idEvento, ae.idAcao, ae.dataInicio, ae.dataFim, ae.vagasPreenchidas, ae.horario, 
                        a.nomeAcao, a.valor, a.numVagas
                 FROM AcaoEvento ae
                 INNER JOIN Acao a ON ae.idAcao = a.idAcao
                 WHERE ae.idEvento = $1`,
                [idEvento]
            );
    
            return res.status(200).json(result.rows); // Retornar as ações vinculadas ao evento
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao listar ações do evento', error: err.message });
        }
    }
}