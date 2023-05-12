const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

app.get('/', async (req, res) => {
  const connection = await mysql.createConnection(config);
  await connection.execute(`
  CREATE TABLE IF NOT EXISTS people (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
  )
`);

  const sql = `INSERT INTO people(name) values('fullcycle')`;

  await connection.execute(sql);
  const result = await connection.execute('SELECT * FROM people');
  connection.end();
  const names = result[0].map(({ name }) => `<li>${name}</li>`);

  res.send(`<div>
    <h1>Full Cycle Rocks!</h1>
    <ul>
  ${names}
    </ul>
   </div>`);
});

app.listen(port, () => {
  console.log('rodando na porta' + port);
});
