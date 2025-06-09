const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const procedimentoRoutes = require('./routes/procedimentos');
const agendamentoRoutes = require('./routes/agendamentos');

require('dotenv').config();
require('./db');

app.use(cors());
app.use(express.json());

app.use('/routes/auth', authRoutes);
app.use('/routes/procedimentos', procedimentoRoutes);
app.use('/routes/agendamentos', agendamentoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
