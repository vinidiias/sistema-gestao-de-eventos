const bcrypt = require('bcrypt')
const pool = require("../conexao");

async function hashPassword (password){
    try{
        const salt = await bcrypt.getSalt(10)
        const encyptedPassword = await bcrypt.hash(password, salt)
        return encyptedPassword
    }
    catch(err){
        return err
    }
}

module.exports = {
    async create (req, res){
        const { nomeParticipante, email, telefone, cpf, senha, confirmacaoSenha } = req.body

        try{
            // Validação: verificar se senha e confirmação correspondem
            if (senha !== confirmacaoSenha) {
                return res.status(400).json({ message: 'As senhas não correspondem' });
            }

            // Verificar se o e-mail já está cadastrado
            const emailExist = await pool.query('SELECT * FROM Participante WHRER email = $1', [email])
            if(emailExist.rowCount > 0){
                return res.satatus(400).json({ message: 'Email ja cadastrado'})
            }

            // Verificar se o CPF já está cadastrado
            const cpfExiste = await pool.query('SELECT * FROM Participante WHERE cpf = $1', [cpf]);
            if (cpfExiste.rowCount > 0) {
                return res.status(400).json({ message: 'CPF já cadastrado' });
            }

            const hashedPassword = await hashPassword(senha)

            const result = await pool.query(
                `INSERT INTO Participante 
                (nomeParticipante, email, telefone, cpf, senha) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING *`,
                [nomeParticipante, email, telefone, cpf, hashedPassword]
              );
        
              res.status(200).json(result.rows[0]); 
        }
        catch (err) {
            res.status(400).json({ message: 'Erro ao cadastrar participante', error: err.message });
        }
    }
}