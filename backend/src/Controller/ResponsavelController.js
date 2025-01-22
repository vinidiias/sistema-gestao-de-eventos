const pool = require('../conexao');

module.exports = {
  async create(req, res) {
    const { nome, email, telefone, cpf } = req.body;

    try {
      // Verificar se o CPF já está cadastrado
      const cpfExist = await pool.query('SELECT * FROM Responsavel WHERE cpf = $1', [cpf]);
      if (cpfExist.rowCount > 0) {
        return res.status(400).json({ message: 'CPF já cadastrado' });
      }

      // Verificar se o email já está cadastrado
      const emailExist = await pool.query('SELECT * FROM Responsavel WHERE email = $1', [email]);
      if (emailExist.rowCount > 0) {
        return res.status(400).json({ message: 'E-mail já cadastrado' });
      }

      // Inserir o responsável no banco de dados
      const result = await pool.query(
        `INSERT INTO Responsavel (nome, email, telefone, cpf) 
         VALUES ($1, $2, $3) 
         RETURNING *`,
        [nome, email, telefone, cpf]
      );

      // Retornar o responsável cadastrado
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erro ao cadastrar responsável', error: err.message });
    }
  }
};
