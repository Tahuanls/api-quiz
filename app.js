const express = require("express");
const app = express();
const perguntaModel = require("./models/pergunta");
const produtoModel = require("./models/produto");
const ObjectID = require("mongodb").ObjectID;
const bodyparser = require("body-parser");

let produtos = [];

// body parser stuff
app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());

app.get("/", function(req, res) {
  console.log("tauan");
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
      perguntaModel.findOne(
        {},
        "pergunta respostas",
        { skip: random },
        function(err, doc) {
          console.log(doc);
          console.log(doc._id);
          res.type("application/json");
          res.status(200).send(JSON.stringify(doc));
        }
      );
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
  let id = req.body.id
  let resposta = req.body.resposta;
  perguntaModel.findById(id, function(err, doc) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      data = { resposta: false };
      res.type("application/json");
      if (doc.respostaCerta == resposta) data.resposta = true;
      res.status(200).send(JSON.stringify(data));
    }
  });
});

// routes produtos
app.post("/api/produto/try", function(req, res) {
  console.log("Verificando se usuário acertou o código");
  let id = req.body.id;
  let codigo = req.body.codigo;
  console.log(id, codigo);
  // 5e753f7b1c9d44000016c076
  produtoModel.findById(id, function(err, prod) {
    if (err) {
      res.status(500).send(
        JSON.stringify({
          resultado: "erro",
          msg: "Não foi possível consultar os produtos no servidor."
        })
      );
      return console.error(err);
    }
    console.log(prod);
    data = { resposta: false };
    if (codigo == prod.codigo) data.resposta = true
      res.status(200).send(
        JSON.stringify({
          data
        })
      );
  });
});

app.get("/api/produtos", async function(req, res) {
  // consulta todos os produtos
  console.log("Pediu todos os produtos");
  res.type("application/json");

  await produtoModel.find(function(err, prods) {
    if (err) {
      res.status(500).send(
        JSON.stringify({
          resultado: "erro",
          msg: "Não foi possível consultar os produtos no servidor."
        })
      );
      return console.error(err);
    }
    produtos = prods;
  });

  console.log("produtos: ", produtos);

  prodFiltrado = [];
  produtos.forEach(function(p) {
    if (p.data_enc === null) {
      prodFiltrado.push({
        id: p._id,
        nome: p.nome,
        marca: p.marca,
        grau: p.grau,
        data_ini: new Date(p.data_ini).toLocaleString()
      });
    }
  });

  res.status(200).send(
    JSON.stringify({
      data: prodFiltrado
    })
  );
});

let PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log("listening to port 3000");

let db = require("./database");
