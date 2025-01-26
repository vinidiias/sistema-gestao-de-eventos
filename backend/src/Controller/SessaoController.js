const pool = require("../conexao");
const bcrypt = require('bcrypt')

module.exports = {
    async  login (req, res) {
        const {email, senha} = req.body
        
        try {
            // Buscar o usuário no banco de dados pelo email
            const userResult = await pool.query(
                'SELECT * FROM Usuario WHERE email = $1',
                [email]
            );
    
            // Verificar se o usuário existe
            if (userResult.rowCount === 0) {
                return res.status(400).json({ message: 'Usuario nao encontrado' });
            }
    
            // Obter o registro do usuário
            let role;
            const user = userResult.rows[0];
            if(user.email === "admim@gmail.com.br") role = "admin"

            else{
                role = "outro"
            }

            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid password' });
            }
 
            // Retornar sucesso e (opcionalmente) algum token ou informações do usuário
            return res.status(200).json({ message: 'Login successful', user: { id: user.idusuario, email: user.email }, role });
    
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(400).json({ message: 'An error occurred during login', error: err.message });
        }
    }
}