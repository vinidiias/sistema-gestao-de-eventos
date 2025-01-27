const pool = require("../conexao");

module.exports = {
    async create(req, res) {
        const { nomeAcao, tipoAcao, cpfResponsavel, valor, numVagas, horario } = req.body;
    
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
                `SELECT idParticipante FROM Participante WHERE cpf = $1`,
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
                `INSERT INTO Acao (nomeAcao, idParticipante, valor, numVagas, idTipoAcao, horario)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING *`,
                [
                    nomeAcao,
                    idResponsavel, 
                    valor,
                    numVagas,
                    idTipoAcao, 
                    horario
                ]
            );
    
            return res.status(201).json(result.rows[0]); // Retornar a ação criada

        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao criar a ação', error: err.message });
        }
    },

    async listAcoesComEventos(req, res) {
        try {
            // Executar a consulta no banco de dados
            const result = await pool.query(
                `SELECT 
                    a.idAcao,
                    a.nomeAcao,
                    a.valor,
                    a.numVagas,
                    a.horario,
                    e.idEvento,
                    e.nomeEvento,
                    e.dataInicio,
                    e.dataFim
                 FROM 
                    Acao a
                 INNER JOIN 
                    AcaoEvento ae ON a.idAcao = ae.idAcao
                 INNER JOIN 
                    Evento e ON ae.idEvento = e.idEvento`
            );
    
            // Retornar as ações com os eventos
            return res.status(200).json(result.rows);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao listar ações com eventos', error: err.message });
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
                `SELECT 
                    p.idParticipante,
                    p.nomeParticipante,
                    p.telefone,
                    p.cpf,
                    u.email AS emailUsuario,
                    e.idEvento,
                    e.nomeEvento,
                    a.idAcao,
                    a.nomeAcao
                 FROM 
                    Participante p
                 INNER JOIN 
                    Usuario u ON p.idUsuario = u.idUsuario
                 LEFT JOIN 
                    ParticipanteAcaoEvento pae ON p.idParticipante = pae.idParticipante
                 LEFT JOIN 
                    Evento e ON pae.idEvento = e.idEvento
                 LEFT JOIN 
                    Acao a ON pae.idAcao = a.idAcao`
            );
    
            return res.status(200).json(result.rows); // Retorna todos os participantes com detalhes
        } catch (err) {
            console.error(err); // Logar o erro para depuração
            return res.status(500).json({ message: 'Erro ao listar participantes', error: err.message });
        }
    }
    , 

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
    },

    async  listAcoesPorTipo(req, res) {
        try {
            const result = await pool.query(
                `SELECT 
                    t.nomeTipoAcao AS tipoAcao, 
                    a.idAcao, 
                    a.nomeAcao, 
                    a.valor, 
                    a.numVagas,
                    a.horario
                 FROM 
                    Acao a
                 INNER JOIN 
                    TipoAcao t ON a.idTipoAcao = t.idTipoAcao
                 ORDER BY 
                    t.nomeTipoAcao, a.nomeAcao`
            );
    
            const groupedAcoes = result.rows.reduce((acc, acao) => {
                if (!acc[acao.tipoacao]) {
                    acc[acao.tipoacao] = [];
                }
                acc[acao.tipoacao].push({
                    idAcao: acao.idacao,
                    nomeAcao: acao.nomeacao,
                    valor: acao.valor,
                    numVagas: acao.numvagas,
                });
                return acc;
            }, {});
    
            res.status(200).json(groupedAcoes);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: 'Erro ao listar ações por tipo', error: err.message });
        }
    }
}
