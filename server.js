const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const MEMORY_FILE = 'memory.json';

// Inicializa memória se não existir
if (!fs.existsSync(MEMORY_FILE)) fs.writeFileSync(MEMORY_FILE, JSON.stringify([]));

// Função para carregar e salvar memória
const loadMemory = () => JSON.parse(fs.readFileSync(MEMORY_FILE));
const saveMemory = (memory) => fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory));

app.post('/chat', (req, res) => {
  const { message } = req.body;
  let memory = loadMemory();

  // Exemplo simples de “aprendizado”
  if (!memory.includes(message)) memory.push(message);
  saveMemory(memory);

  res.json({ reply: `Huhu lembra que você disse: "${message}"` });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
