const pool = require("../conexao");
const bcrypt = require('bcrypt')

module.exports = {
    async login(req, res) {
        const { email, senha } = req.body;
    
        try {
            // Buscar o usuário no banco de dados pelo email
            const userResult = await pool.query(
                'SELECT * FROM Usuario WHERE email = $1',
                [email]
            );
    
            // Verificar se o usuário existe
            if (userResult.rowCount === 0) {
                return res.status(400).json({ message: 'Usuário não encontrado' });
            }
    
            // Obter o registro do usuário
            const user = userResult.rows[0];
            let role;
    
            // Determinar o papel do usuário
            if (user.email === "admim@gmail.com.br") {
                role = "admin";
            } else {
                role = "outro";
            }
    
            // Verificar se a senha é válida
            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Senha inválida' });
            }
    
            // Buscar o idParticipante correspondente ao idUsuario
            const participanteResult = await pool.query(
                'SELECT idParticipante FROM Participante WHERE idUsuario = $1',
                [user.idusuario]
            );
    
            // Verificar se o participante existe
            const idParticipante = participanteResult.rowCount > 0 
                ? participanteResult.rows[0].idparticipante 
                : null;
    
            // Retornar os dados do usuário, o papel e o idParticipante
            return res.status(200).json({
                message: 'Login realizado com sucesso',
                user: {
                    id: user.idusuario,
                    email: user.email,
                    firstLogin: user.firstlogin, // Verificar o valor do banco
                    idParticipante: idParticipante // Retornar o idParticipante (ou null se não existir)
                },
                role: role
            });
    
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({
                message: 'Ocorreu um erro durante o login',
                error: err.message
            });
        }
    }
    
}