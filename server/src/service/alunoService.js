const db = require('../db')

module.exports = {
    buscarTodos: () => new Promise((resolve, reject) => {
        db.query('select * from alunos', (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    buscarUm: (codigo) => new Promise((resolve, reject) => {
        db.query('select * from alunos where matricula = ?', [codigo], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    addAluno: (matricula, nome, sobrenome, turma) => new Promise((resolve, reject) => {
        db.query('insert into alunos(matricula, nome, sobrenome, turma) values(?, ?, ?, ?);', [matricula, nome, sobrenome, turma], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    alterAluno: (matricula, nome, sobrenome, turma) => new Promise((resove, reject) => {
        db.query('update alunos set nome = ?, sobrenome = ?, turma = ? where matricula = ?', [nome, sobrenome, turma,  matricula], (erro, results) => {
            if(erro) reject(erro)
            resove(results)
        })
    }),

    delete: matricula => new Promise((resolve, reject) => {
        db.query('delete from alunos where matricula = ?', [matricula], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    })
}