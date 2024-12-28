const express = require('express');
const router = require('./Routes/router')
const app = express();

// Middleware para JSON
app.use(express.json());
app.use(router)

// Rota de teste
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});


// Porta do servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
