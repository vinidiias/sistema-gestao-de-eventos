const bcrypt = require('bcrypt')
const pool = require("../conexao");


module.exports = {
    async create(req, res) {
        const { nomeParticipante, email, telefone, cpf, senha} = req.body;
    
        try {
            
            // Verificar se o CPF já está cadastrado
            const cpfExiste = await pool.query('SELECT * FROM Participante WHERE cpf = $1', [cpf]);
            if (cpfExiste.rowCount > 0) {
                return res.status(400).json({ message: 'CPF já cadastrado' });
            }
    
            
            // Inserir no banco de dados
            const result = await pool.query(
                `INSERT INTO Participante 
                (nomeParticipante, email, telefone, cpf, senha) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING *`,
                [nomeParticipante, email, telefone, cpf, hashedPassword]
            );
    
            // Retornar o participante cadastrado
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            res.status(400).json({ message: 'Erro ao cadastrar participante', error: err.message });
        }
    },

    async index(req, res) {
        try {
            const result = await pool.query('SELECT * FROM Participante');
            res.status(200).json(result.rows);
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            res.status(500).json({ message: 'Erro ao buscar participantes', error: err.message });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { nomeParticipante, email, telefone, cpf, senha } = req.body;
    
        try {
            // Criptografar a nova senha, se fornecida
            let hashedPassword = null;
            if (senha) {
                hashedPassword = await hashPassword(senha);
            }
    
            // Atualizar os dados no banco
            const result = await pool.query(
                `UPDATE Participante 
                 SET nomeParticipante = COALESCE($1, nomeParticipante), 
                     email = COALESCE($2, email), 
                     telefone = COALESCE($3, telefone), 
                     cpf = COALESCE($4, cpf), 
                     senha = COALESCE($5, senha) 
                 WHERE idParticipante = $6 
                 RETURNING *`,
                [nomeParticipante, email, telefone, cpf, hashedPassword, id]
            );
    
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Participante não encontrado' });
            }
    
            res.status(200).json(result.rows[0]);
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            res.status(500).json({ message: 'Erro ao atualizar participante', error: err.message });
        }
    },
    

    async delete(req, res) {
        const { id } = req.params;
    
        try {
            const result = await pool.query('DELETE FROM Participante WHERE idparticipante = $1 RETURNING *', [id]);
    
            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Participante não encontrado' });
            }
    
            res.status(200).json({ message: 'Participante deletado com sucesso', participante: result.rows[0] });
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            res.status(500).json({ message: 'Erro ao deletar participante', error: err.message });
        }
    }
    
    
}