const express = require("express");
const app = express();

let perguntas = [
  {
    pergunta: "pergunta 1?",
    respostas: ["res 1", "res 2", "res 3", "res 4"],
    certa: 3
  },
  {
    pergunta: "pergunta 2?",
    respostas: ["res 1", "res 2", "res 3", "res 4"],
    certa: 3
  },
  {
    pergunta: "pergunta 3?",
    respostas: ["res 1", "res 2", "res 3", "res 4"],
    certa: 3
  },
  {
    pergunta: "pergunta 4?",
    respostas: ["res 1", "res 2", "res 3", "res 4"],
    certa: 3
  }
];

const users = [
  { id: 1, name: "Thauan Lopes" },
  { id: 2, name: "Filipe Zanella" }
];

app.get("/", function(req, res) {
  res.send("Quiz");
});

app.get("/api/rdn-question", function(req, res) {
  let n = parseInt(perguntas.length * Math.random());
  console.log(n);
  res.type("application/json");
  res.status(200).send(perguntas[n]);
});

app.get("/api/pergunta/:id", function(req, res) {
  console.log("Requested pergunta " + req.params.id);
  res.type("application/json");
  res.status(200).send(JSON.stringify(perguntas[req.params.id - 1]));
});

app.get("/api/perguntas", function(req, res) {
  console.log("Requested perguntas ");
  res.type("application/json");
  res.status(200).send(perguntas);
});

let PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log("listening to port 3000");

let db = require('./database')
