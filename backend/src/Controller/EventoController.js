const pool = require("../conexao");

module.exports = {
    async create(req, res) {
        const { nomeEvento, dataInicio, dataFim, cep, rua, cidade, bairro, complemento, horario } = req.body;
      
        try {
          // 1. Verificar se o endereço existe
          const enderecoResult = await pool.query(
            `SELECT idEndereco FROM Endereco 
             WHERE cep = $1 AND rua = $2 AND cidade = $3 AND bairro = $4 AND complemento = $5`,
            [cep, rua, cidade, bairro, complemento]
          );
      
          let idEndereco;
      
          if (enderecoResult.rowCount > 0) {
            // Endereço encontrado, obter o ID
            idEndereco = enderecoResult.rows[0].idendereco; 
          } else {
            // 2. Inserir um novo endereço se não existir
            const novoEnderecoResult = await pool.query(
              `INSERT INTO Endereco (cep, rua, cidade, bairro, complemento) 
               VALUES ($1, $2, $3, $4, $5) 
               RETURNING idEndereco`,
              [cep, rua, cidade, bairro, complemento]
            );
            idEndereco = novoEnderecoResult.rows[0].idendereco;
          }
      
          // 3. Criar o evento
          const eventoResult = await pool.query(
            `INSERT INTO Evento (nomeEvento, dataInicio, dataFim, idEndereco, horario) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING *`,
            [nomeEvento, dataInicio, dataFim, idEndereco, horario]
          );
      
          // Retornar o evento criado
          res.status(201).json(eventoResult.rows[0]);
        } catch (err) {
          console.error(err); // Logar o erro para depuração
          res.status(400).json({ message: 'Erro ao criar evento', error: err.message });
        }
      },

      async index(req, res) {
        try {
            const result = await pool.query(
                `SELECT 
                    e.idevento, 
                    e.nomeevento, 
                    e.datainicio, 
                    e.datafim, 
                    e.horario,
                    en.idendereco, 
                    en.cep, 
                    en.rua, 
                    en.cidade, 
                    en.bairro, 
                    en.complemento
                 FROM Evento e
                 INNER JOIN Endereco en ON e.idendereco = en.idendereco`
            );
    
            return res.status(200).json(result.rows); // Retorna os eventos com endereços
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: 'Erro ao listar eventos', error: err.message });
        }
    },

    async update (req, res) { //confia
        const { id } = req.params
        const { nomeEvento, dataInicio, dataFim, cep, rua, cidade, bairro, complemento, horario } = req.body

        try {
          // 1. Verificar se o endereço existe
          const enderecoResult = await pool.query(
            `SELECT idEndereco FROM Endereco 
             WHERE cep = $1 AND rua = $2 AND cidade = $3 AND bairro = $4 AND complemento = $5`,
            [cep, rua, cidade, bairro, complemento]
          );
      
          let idEndereco;
      
          if (enderecoResult.rowCount > 0) {
            // Endereço encontrado, obter o ID
            idEndereco = enderecoResult.rows[0].idendereco; 
          } else {
            // 2. Inserir um novo endereço se não existir
            const novoEnderecoResult = await pool.query(
              `INSERT INTO Endereco (cep, rua, cidade, bairro, complemento) 
               VALUES ($1, $2, $3, $4, $5) 
               RETURNING idEndereco`,
              [cep, rua, cidade, bairro, complemento]
            );
            idEndereco = novoEnderecoResult.rows[0].idendereco;
          }
            const result = await pool.query(
                'UPDATE Evento SET nomeEvento = $1, dataInicio = $2, dataFim = $3, idEndereco = $4, horario = $5 WHERE idEvento = $6 RETURNING *',
                [nomeEvento, dataInicio, dataFim, idEndereco, horario, id]
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