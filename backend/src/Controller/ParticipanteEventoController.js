const pool = require("../conexao");

module.exports = {
    async create(req, res) {
        const { idevento, idparticipante } = req.params; // Corrigido para req.params
    
        try {
            // Verificar se o participante existe
            const participanteResult = await pool.query(
                `SELECT idParticipante FROM Participante WHERE idParticipante = $1`, 
                [idparticipante]
            );

            if (participanteResult.rowCount === 0) {
                return res.status(400).json({ message: 'Participante não foi encontrado' });
            }
    
            // Verificar se o evento existe
            const eventoResult = await pool.query(
                `SELECT idEvento FROM Evento WHERE idEvento = $1`, 
                [idevento]
            );
            
            if (eventoResult.rowCount === 0) {
                return res.status(400).json({ message: 'Evento não foi encontrado' });
            }
    
            // Definir o status como "Confirmado"
            const status = "Confirmado";
    
            // Inserir na tabela ParticipanteEvento
            const result = await pool.query(
                `INSERT INTO ParticipanteEvento 
                (idEvento, idParticipante, statusParticipanteEvento) 
                VALUES ($1, $2, $3) 
                RETURNING *`, 
                [idevento, idparticipante, status]
            );


            // Retornar a confirmação
            res.status(201).json({
                message: 'Confirmação do evento concluída',
                participanteEvento: result.rows[0]
            });
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            res.status(400).json({ message: 'Erro ao confirmar participante no evento', error: err.message });
        }
    },

    async index(req, res) {
        const { idparticipante } = req.params;
    
        try {
            // Verificar se o participante existe
            const participanteResult = await pool.query(
                `SELECT idParticipante FROM Participante WHERE idParticipante = $1`,
                [idparticipante]
            );
            if (participanteResult.rowCount === 0) {
                return res.status(400).json({ message: 'Participante não encontrado' });
            }
    
            // Buscar os eventos em que o participante está inscrito
            const eventosResult = await pool.query(
                `SELECT 
                    e.idEvento, 
                    e.nomeEvento, 
                    e.dataInicio, 
                    e.dataFim, 
                    e.horario,
                    en.cep,
                    en.rua,
                    en.cidade,
                    en.bairro,
                    en.complemento
                 FROM 
                    ParticipanteEvento pe
                 INNER JOIN 
                    Evento e ON pe.idEvento = e.idEvento
                 INNER JOIN 
                    Endereco en ON e.idEndereco = en.idEndereco
                 WHERE 
                    pe.idParticipante = $1 AND pe.statusParticipanteEvento = $2`,
                [idparticipante, "Confirmado"]
            );
    
            // Verificar se o participante está inscrito em algum evento
            if (eventosResult.rowCount === 0) {
                return res.status(404).json({ message: 'Nenhum evento encontrado para este participante' });
            }
    
            // Retornar a lista de eventos
            return res.status(200).json(eventosResult.rows);
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao buscar eventos do participante', error: err.message });
        }
    },

    async update (req, res) {
        const {idevento} = req.params
        const {cpf, nomeParticipante} = req.body 

        try {
            // Verificar se o evento existe
            const eventoResult = await pool.query(
                `SELECT idEvento FROM Evento WHERE idEvento = $1`,
                [idevento]
            );
            if (eventoResult.rowCount === 0) {
                return res.status(400).json({ message: 'Evento não foi encontrado' });
            }

            const participante = await pool.query(`SELECT idParticipante FROM Participante WHERE cpf = $1 AND nomeParticipante = $2`, [cpf, nomeParticipante])
            if(participante.rowCount === 0) return res.status(400).json({ message: 'Participante não encontrado' });

            // Verificar se o participante existe no evento
            const participanteEventoResult = await pool.query(
                `SELECT * FROM ParticipanteEvento 
                 WHERE idEvento = $1 AND idParticipante = $2`,
                [idevento, participante.rows[0].idparticipante]
            );
            if (participanteEventoResult.rowCount === 0) {
                return res.status(400).json({ message: 'Participante não encontrado no evento' });
            }
    
            // Atualizar o status para "Cancelado"
            const result = await pool.query(
                `UPDATE ParticipanteEvento 
                 SET statusParticipanteEvento = $1 
                 WHERE idEvento = $2 AND idParticipante = $3 
                 RETURNING *`,
                ["Cancelado", idevento, participante.rows[0].idparticipante]
            );
    
            return res.status(200).json({
                message: 'Status do participante atualizado para "Cancelado"',
                participanteEvento: result.rows[0]
            });

        }catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao atualizar status', error: err.message });
        }
    }

}