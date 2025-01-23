const pool = require("../conexao");

module.exports = {
    async create (req, res) {
        const {nomeTipoAcao} = req.body

        try{
            const result = await pool. query(`INSERT INTO TipoAcao (nomeTipoAcao)
                VALUES ($1)
                RETURNING *`, [nomeTipoAcao])

                return res.status(200).json(result.rows[0])
            
        }catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao criar tipo do Evento', error: err.message });
        }
    },

    async index(req, res) {
        try {
            const result = await pool.query('SELECT * FROM TipoAcao');
            return res.status(200).json(result.rows); // Retorna todos os registros

        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao buscar tipos de ação', error: err.message });
        }
    },

    async delete(req, res) {
        const { idTipoAcao } = req.params; // Receber o ID da URL
    
        try {
            // Verificar se o registro existe
            const tipoAcaoResult = await pool.query(
                `SELECT * FROM TipoAcao WHERE idTipoAcao = $1`,
                [idTipoAcao]
            );
            if (tipoAcaoResult.rowCount === 0) {
                return res.status(400).json({ message: 'Tipo de ação não encontrado' });
            }
    
            // Excluir o registro
            await pool.query(`DELETE FROM TipoAcao WHERE idTipoAcao = $1`, [idTipoAcao]);
            return res.status(200).json({ message: 'Tipo de ação excluído com sucesso' });

        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(400).json({ message: 'Erro ao excluir tipo de ação', error: err.message });
        }
    }
    
    
}