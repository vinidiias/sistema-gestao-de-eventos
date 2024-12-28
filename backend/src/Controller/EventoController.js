const pool = require("../conexao");

module.exports = {
    async create (req, res) {
        const { nomeEvento, dataInicio, dataFim, idEndereco } = req.body

        try {
            const result = await pool.query(
                'INSERT INTO Evento (nomeEvento, dataInicio, dataFim, idEndereco) VALUES ($1, $2, $3, $4) RETURNING *',
                [nomeEvento, dataInicio, dataFim, idEndereco]
            )
        res.status(200).json(result.rows[0])
        }
        catch (err) {
            console.error(err); // Logar o erro no console para depuração
            res.status(400).json({ message: 'Erro ao criar evento', error: err.message });
        }        
    },

    async index (req, res) {
        try{
            const result = await pool.query('SELECT * FROM Evento')

            return res.status(200).json(result.rows)
        }
        catch (err) {
            return res.status(400).send(err)
        }
    },

    async update (req, res) {
        const { id } = req.params
        const { nomeEvento, dataInicio, dataFim, idEndereco } = req.body

        try {
            const result = await pool.query(
                'UPDATE Evento SET nomeEvento = $1, dataInicio = $2, dataFim = $3, idEndereco = $4 WHERE idEvento = $5 RETURNING *',
                [nomeEvento, dataInicio, dataFim, idEndereco, id]
            )
            return res.status(200).json(result.rows[0])
        }
        catch(err){
            return res.status(400).send(err)
        }
    },

    async delete (req, res) {
        const { id } = req.params

        try {
            await pool.query('DELETE FROM Evento WHERE idEvento = $1', [id])
            return res.status(200).send('Evento excluido com sucesso')
        }
        catch(err){
            return res.status(400).send(err)
        }
    }
}