const pool = require("../conexao");

module.exports = {
    async create(req, res) {
        const { nomeAcao, tipoAcao, cpfResponsavel, valor, numVagas } = req.body;
    
        try {
            // Verificar se o tipo de ação existe
            const tipoAcaoResult = await pool.query(
                `SELECT idTipoAcao FROM TipoAcao WHERE nomeTipoAcao = $1`,
                [tipoAcao]
            );
            if (tipoAcaoResult.rowCount === 0) {
                return res.status(400).json({ message: 'Tipo de ação não encontrado' });
            }
    
            // Verificar se o responsável existe
            const responsavelResult = await pool.query(
                `SELECT idResponsavel FROM Responsavel WHERE cpf = $1`,
                [cpfResponsavel]
            );
            if (responsavelResult.rowCount === 0) {
                return res.status(400).json({ message: 'Responsável não encontrado' });
            }
    
            // Obter os IDs necessários
            const idResponsavel = responsavelResult.rows[0].idresponsavel;
            const idTipoAcao = tipoAcaoResult.rows[0].idtipoacao;
            
            // Inserir a ação na tabela Acao
            const result = await pool.query(
                `INSERT INTO Acao (nomeAcao, idResponsavel, valor, numVagas, idTipoAcao)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING *`,
                [
                    nomeAcao,
                    idResponsavel, // Passa o valor correto do ID
                    valor,
                    numVagas,
                    idTipoAcao // Passa o valor correto do ID
                ]
            );
    
            return res.status(201).json(result.rows[0]); // Retornar a ação criada
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao criar a ação', error: err.message });
        }
    },

    async update (req, res) { //confiaaa
        const { idAcao} = req.params
        const { nomeAcao, nomeTipoAcao, cpfResponsavel, valor, numVagas} = req.body

        try {
            const tipoAcaoResult = await pool.query(`SELECT idtipoacao FROM TipoAcao WHERE nomeTipoAcao = $1`, [nomeTipoAcao])

            let tipoacao;

            if(tipoAcaoResult.rowCount > 0){
                tipoacao = tipoAcaoResult.rows[0].idtipoacao
            } 
            else {
                const novoTipoAcao = await pool.query(
                    `INSERT INTO TipoAcao (nometipoacao) 
                     VALUES ($1) 
                     RETURNING idtipoacao`,
                    [nomeTipoAcao]
                  );
                  tipoacao = nomeTipoAcao.rows[0].idtipoacao
            }

            const responsavelResult = await pool.query(`SELECT idresponsavel FROM Responsavel WHRERE cpf = $1`, [cpfResponsavel])
            if(responsavelResult.rowCount === 0) return res.status(400).json({message: "Responsavel pela acao nao encontrado"})

            const result = await pool.query(
                'UPDATE Acao SET nomeacao = $1, idresponsavel = $2, valor = $3, numvagas = $4, tipoacao = $5 WHERE idacao = $6 RETURNING *',
                [ nomeAcao, responsavelResult.rows[0].idresponsavel, valor, numVagas, tipoacao, idAcao]
            )
            return res.status(200).json(result.rows[0])            

        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao criar a ação', error: err.message });
        }
    },

    async index(req, res) {
        try {
            const result = await pool.query(
                `SELECT a.idAcao, a.nomeAcao, a.valor, a.numVagas, t.nomeTipoAcao, r.email AS emailResponsavel, r.nomeResponsavel
                 FROM Acao a
                 INNER JOIN TipoAcao t ON a.idTipoAcao = t.idTipoAcao
                 INNER JOIN Responsavel r ON a.idResponsavel = r.idResponsavel`
            );
    
            return res.status(200).json(result.rows); // Retorna todas as ações com os detalhes associados
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao listar ações', error: err.message });
        }
    }, 

    async delete(req, res) {
        const { idAcao } = req.params; // Recebe o ID da ação pela URL
    
        try {
            // Verificar se a ação existe
            const acaoResult = await pool.query(`SELECT * FROM Acao WHERE idAcao = $1`, [idAcao]);
            if (acaoResult.rowCount === 0) {
                return res.status(404).json({ message: 'Ação não encontrada' });
            }
    
            // Excluir a ação
            await pool.query(`DELETE FROM Acao WHERE idAcao = $1`, [idAcao]);
            return res.status(200).json({ message: 'Ação excluída com sucesso' });
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao excluir a ação', error: err.message });
        }
    }   
    
}
