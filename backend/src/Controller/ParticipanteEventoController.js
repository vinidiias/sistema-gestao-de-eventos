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
        const { idevento } = req.params;
        const participantes = []; // Lista de participantes confirmados
    
        try {
            // Verificar se o evento existe
            const eventoResult = await pool.query(
                `SELECT idEvento FROM Evento WHERE idEvento = $1`,
                [idevento]
            );
            if (eventoResult.rowCount === 0) {
                return res.status(400).json({ message: 'Evento não foi encontrado' });
            }
    
            // Buscar participantes confirmados no evento
            const search = await pool.query(
                `SELECT idParticipante FROM ParticipanteEvento 
                 WHERE idEvento = $1 AND statusParticipanteEvento = $2`,
                [idevento, "Confirmado"]
            );
            if (search.rowCount === 0) {
                return res.status(404).json({ message: 'Nenhum participante confirmado para este evento' });
            }
    
            // Buscar detalhes dos participantes confirmados
            for (let i = 0; i < search.rowCount; i++) {
                const searchParticipante = await pool.query(
                    `SELECT nomeParticipante, cpf 
                     FROM Participante 
                     WHERE idParticipante = $1`,
                    [search.rows[i].idparticipante] // Corrigido: valores devem estar em um array
                );
                participantes.push(searchParticipante.rows[0]); // Adicionar o resultado na lista
            }
    
            // Retornar a lista de participantes confirmados
            return res.status(200).json(participantes);
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao buscar participantes do evento', error: err.message });
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