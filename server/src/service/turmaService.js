const db = require('../db')

module.exports = {
    curso: () => new Promise((resolve, reject) => {
        db.query('select * from curso', (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    }),
    buscarTodos: () => new Promise((resolve, reject) => {
        db.query(`select turma.id_turma, turma.periodo, curso.nome_curso as curso, turma.data_inicio
        from turma
        inner join curso on turma.fk_curso = curso.cod_curso;`, (erro, results) => {
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

    addTurma: (idTurma, periodo, curso, data, sala) => new Promise((resolve, reject) => {
        db.query(`insert into turma(id_turma, periodo, fk_curso, data_incio, sala)
        values(?, ?, ?, ?, ?)`, [idTurma, periodo, curso, data, sala], (erro, results) => {
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