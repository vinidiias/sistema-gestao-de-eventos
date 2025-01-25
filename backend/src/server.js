const express = require('express');
const cors = require('cors')
const router = require('./Routes/router')
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

// Middleware para JSON
app.use(express.json());
app.use(router)

// Porta do servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
