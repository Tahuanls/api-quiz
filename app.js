const express = require("express");
const app = express();
const perguntaModel = require("./models/pergunta");
const ObjectID = require("mongodb").ObjectID;
const bodyparser = require("body-parser");

// body parser stuff
app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());

app.get("/", function(req, res) {
  console.log("tauan")
  res.status(200).send("Quiz v2");
});

app.get("/api/rdn-question", function(req, res) {
  perguntaModel.countDocuments(function(err, count) {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      var random = Math.floor(Math.random() * count);
      // console.log(random)
      perguntaModel.findOne({}, 'pergunta respostas', { skip: random }, function(err, doc) {
        console.log(doc);
        console.log(doc._id);
        res.type("application/json");
        res.status(200).send(JSON.stringify(doc));
      });
    }
  });
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

app.post("/api/verificar", function(req, res) {
  // 5e3c6f92fdded93f306378d5
  let resposta = req.body.resposta;
  perguntaModel.findById("5e3c6f92fdded93f306378d5", function(err, doc) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      //  console.log(doc)
      console.log(doc);
      console.log("Thauan")
      data = {resposta: false}
      res.type("application/json");
      if (doc.respostaCerta == resposta) {
        data.resposta = true;
        res.status(200).send(JSON.stringify(data));
      } else {
        res.status(200).send(JSON.stringify(data));
      }
    }
  });
});

let PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log("listening to port 3000");

let db = require("./database");
