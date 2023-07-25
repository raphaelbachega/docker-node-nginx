const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlCreateTable = `CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT,NAME varchar(255), PRIMARY key(id))`
connection.query(sqlCreateTable)

const sqlInsert = `INSERT INTO people (name) VALUES ('luke'),('Nelson'),('Pinguin');`
connection.query(sqlInsert)

var resultList
const sqlSelect = `SELECT * FROM people`

connection.query(sqlSelect, (err, result, fields)=> {
    if (err) {
        throw err;
    }
    resultList = result.map( person => JSON.stringify(person.name));
})

connection.end()

app.get('/', (req,res) => {
    res.send(`<h1>FullCycle</h1>\n` +
             `${resultList}`)
})

app.listen(port, ()=> {
    console.log('rodando na porta '+ port)
})