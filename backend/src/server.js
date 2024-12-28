const express = require('express');
const pool = require('./conexao');

const app = express();

// Middleware para JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Rota para listar dados de exemplo
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Porta do servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
