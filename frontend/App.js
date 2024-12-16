import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("Usuario");

  useEffect(() => {
    fetch("http://localhost:3000/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const sendMessage = () => {
    fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, message: input }),
    })
      .then((res) => res.json())
      .then(() => {
        setMessages([...messages, { user, message: input, timestamp: new Date() }]);
        setInput("");
      });
  };

  return (
    <div className="App">
      <h1>Chat en Tiempo Real</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Escribe tu mensaje"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default App;
