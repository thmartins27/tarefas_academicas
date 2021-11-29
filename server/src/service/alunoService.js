const db = require('../db')

module.exports = {
    buscarTodos: () => new Promise((resolve, reject) => {
        db.query('select * from aluno', (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    buscarUm: (codigo) => new Promise((resolve, reject) => {
        db.query('select * from aluno where matricula = ?', [codigo], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    addAluno: (matricula, nome, sobrenome, turma, cpf) => new Promise((resolve, reject) => {
        db.query('insert into aluno(matricula, nome, sobrenome, fk_turma, cpf) values(?, ?, ?, ?, ?);', [matricula, nome, sobrenome, turma, cpf], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    alterAluno: (matricula, nome, sobrenome, turma, cpf) => new Promise((resove, reject) => {
        db.query('update aluno set nome = ?, sobrenome = ?, cpf = ?, fk_turma = ? where matricula = ?', [nome, sobrenome, turma,  matricula, cpf], (erro, results) => {
            if(erro) reject(erro)
            resove(results)
        })
    }),

    delete: matricula => new Promise((resolve, reject) => {
        db.query('delete from aluno where matricula = ?', [matricula], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    })
}