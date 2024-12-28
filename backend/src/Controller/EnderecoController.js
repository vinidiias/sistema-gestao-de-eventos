const pool = require('../conexao')

module.exports = {
    async create (req, res) {
        const { cep, rua, cidade, bairro, complemento } = req.body

        try{
            const result = await pool.query(
                'INSERT INTO Endereco (cep, rua, cidade, bairro, complemento) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [cep, rua, cidade, bairro, complemento]
            )
            res.status(200).json(result.rows[0])
        }
        catch (err) {
            console.error(err); // Logar o erro no console para depuração
            res.status(400).json({ message: 'Erro ao cadastrar endereco', error: err.message });
        }
        
    },

    async index (req, res) {
        try {

        }
        catch (err) {
            console.error(err); // Logar o erro no console para depuração
            res.status(400).json({ message: 'Erro ao criar evento', error: err.message });
        }
        
    },

    async update (req, res) {
        try {

        }
        catch (err) {
            console.error(err); // Logar o erro no console para depuração
            res.status(400).json({ message: 'Erro ao criar evento', error: err.message });
        }
        
    },

    async delete (req, res) {
        try {

        }
        catch (err) {
            console.error(err); // Logar o erro no console para depuração
            res.status(400).json({ message: 'Erro ao criar evento', error: err.message });
        }
        
    }
}