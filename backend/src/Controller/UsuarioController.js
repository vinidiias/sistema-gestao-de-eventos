const pool = require("../conexao");
const bcrypt = require('bcrypt')

async function hashPassword(password) {
    try{
        const salt = await bcrypt.genSalt(5)
        const encryptedPassword = await bcrypt.hash(password, salt)
        return encryptedPassword
    }catch(err){
        return err
    }
}

module.exports = {
    async create (req, res){
        const { email, senha } = req.body;

        try {
            
            // Verificar se o e-mail já está cadastrado (CORRIGIDO)
            const emailExist = await pool.query('SELECT * FROM Usuario WHERE email = $1', [email]);
            if (emailExist.rowCount > 0) {
                return res.status(400).json({ message: 'E-mail já cadastrado' });
            }

            // Criptografar a senha
            const hashedPassword = await hashPassword(senha);
            const login = true
    
            const result = await pool.query(
                `INSERT INTO Usuario (email, senha, firstLogin) VALUES ($1, $2, $3) RETURNING *`,
                [email, hashedPassword, login]
            );
            res.status(201).json({
                message: 'Usuário criado com sucesso',
                usuario: result.rows[0]
            });



        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Erro ao criar usuário', error: err.message });
        }
    }, 

    async index (req, res){
        try{
            const result = await pool.query('SELECT * FROM Usuario');
            res.status(200).json(result.rows);
            
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            res.status(500).json({ message: 'Erro ao buscar Usuarios', error: err.message });
        }
    }
}