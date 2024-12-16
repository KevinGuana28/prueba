const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let messages = []; // Memoria temporal para mensajes

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const { user, message } = req.body;
  if (!user || !message) {
    return res.status(400).json({ error: "Faltan datos." });
  }
  messages.push({ user, message, timestamp: new Date() });
  res.status(201).json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
});
