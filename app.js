
// importa o mysql2
const mysql = require("mysql2");

// cria a conexão
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",        // seu usuário do MySQL
  password: "6363azuldez11",   // coloque sua senha aqui
  database: "AgriVerde" // nome do seu BD
});

// conecta
connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
});

// exemplo: inserir um usuário
function inserirUsuario(nome, email, senha) {
  const sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";
  connection.query(sql, [nome, email, senha], (err, results) => {
    if (err) {
      console.error("Erro ao inserir usuário:", err);
      return;
    }
    console.log("Usuário inserido com sucesso! ID:", results.insertId);
  });
}

// exemplo de uso
inserirUsuario("Letícia", "leticia@email.com", "12345");

// fecha a conexão (pode deixar aberta em apps reais)
setTimeout(() => connection.end(), 2000);

