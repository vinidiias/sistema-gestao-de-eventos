//tem q receber um codigo valicao
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
        `INSERT INTO Responsavel (email, telefone, cpf, nomeresponsavel) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [email, telefone, cpf, nome]
      );

      // Retornar o responsável cadastrado
      res.status(201).json(result.rows[0]);
      
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Erro ao cadastrar responsável', error: err.message });
    }
  },

  async index(req, res) {
    try {
        const result = await pool.query(
            `SELECT idResponsavel, nomeresponsavel, email, telefone, cpf FROM Responsavel`
        );
        return res.status(200).json(result.rows); // Retorna todos os registros
    } catch (err) {
        console.error(err); // Logar o erro para depuração
        return res.status(500).json({ message: 'Erro ao listar responsáveis', error: err.message });
    }
},

  async delete(req, res) {
    const { idResponsavel } = req.params; // Recebe o ID da URL

    try {
        // Verificar se o responsável existe
        const responsavelResult = await pool.query(
            `SELECT * FROM Responsavel WHERE idResponsavel = $1`,
            [idResponsavel]
        );
        if (responsavelResult.rowCount === 0) {
            return res.status(404).json({ message: 'Responsável não encontrado' });
        }

        // Excluir o responsável
        await pool.query(`DELETE FROM Responsavel WHERE idResponsavel = $1`, [idResponsavel]);
        return res.status(200).json({ message: 'Responsável excluído com sucesso' });
    } catch (err) {
        console.error(err); // Logar o erro para depuração
        return res.status(500).json({ message: 'Erro ao excluir responsável', error: err.message });
    }
  },

  async update(req, res) {
    const { idResponsavel } = req.params;
    const { nome, email, telefone, cpf } = req.body;

    try {
        // Verificar se o responsável existe
        const responsavelResult = await pool.query(
            `SELECT * FROM Responsavel WHERE idResponsavel = $1`,
            [idResponsavel]
        );
        if (responsavelResult.rowCount === 0) {
            return res.status(404).json({ message: 'Responsável não encontrado' });
        }

        // Atualizar os dados do responsável
        const result = await pool.query(
            `UPDATE Responsavel 
             SET nomeresponsavel = COALESCE($1, nomeresponsavel), 
                 email = COALESCE($2, email), 
                 telefone = COALESCE($3, telefone), 
                 cpf = COALESCE($4, cpf) 
             WHERE idResponsavel = $5 
             RETURNING *`,
            [nome, email, telefone, cpf, idResponsavel]
        );

        return res.status(200).json(result.rows[0]); // Retorna o registro atualizado
    } catch (err) {
        console.error(err); // Logar o erro para depuração
        return res.status(500).json({ message: 'Erro ao atualizar responsável', error: err.message });
    }
  }
};
