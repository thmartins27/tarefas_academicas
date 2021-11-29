const mysql = require('mysql')

const bd = {
    host: 'localhost',
    user: 'saTarefas',
    passwd: '_8280',
    bd: 'db_tarefas_academicas'
}

const connection = mysql.createConnection({
    host: bd.host,
    user: bd.user,
    password: bd.passwd,
    database: bd.bd
})

connection.connect((erro) => {
    if(erro) throw `Erro ao conectar com banco de dados : ${erro}`
    console.log(`Conectado ao banco de dados: ${bd.bd}`)
})

module.exports = connection