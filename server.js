const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// conexão com o BD
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",      // coloque seu usuário
  password: "6363azuldez11", // coloque sua senha
  database: "AgriVerde"
});

// rota inicial (formulário)
app.get("/", (req, res) => {
  res.send(`
    <form action="/add" method="post">
      <label>Nome: <input type="text" name="nome" /></label><br/>
      <label>Email: <input type="email" name="email" /></label><br/>
      <label>Senha: <input type="password" name="senha" /></label><br/>
      <button type="submit">Cadastrar</button>
    </form>
  `);
});

// rota para inserir no BD
app.post("/add", (req, res) => {
  const { nome, email, senha } = req.body;
  const sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
  connection.query(sql, [nome, email, senha], (err, results) => {
    if (err) {
      console.error("Erro ao inserir:", err);
      res.send("Erro ao cadastrar usuário!");
      return;
    }
    res.send("Usuário cadastrado com sucesso! ID: " + results.insertId);
  });
});

// inicia o servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
