const db = require('../db')

module.exports = {
    buscarTodos: () => new Promise((resolve, reject) => {
        db.query('select * from turma;', (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    buscarUm: idTurma => new Promise((resolve, reject) => {
        db.query('select * from turma where id_turma = ?;', [idTurma], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    addTurma: (idTurma, sala, curso, periodo) => new Promise((resolve, reject) => {
        db.query('insert into turma(id_turma, sala, curso, periodo) values(?, ?, ?, ?);', [idTurma, sala, curso, periodo], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    alterTurma: (idTurma, sala, curso, periodo) => new Promise((resolve, reject) => {
        db.query(`update turma set
        sala = ?, curso = ?, periodo = ?
        where id_turma = ?;`, [sala, curso, periodo, idTurma], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    delete: idTurma => new Promise((resolve, reject) => {
        db.query(`delete from turma where id_turma = ?`, [idTurma], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    })
}