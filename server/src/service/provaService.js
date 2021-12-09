const db = require('../db')

module.exports = {
    buscarTodos: () => new Promise((resolve, reject) => {
        db.query(`select data_prova as data, fk_disciplina_turma as disciplina, fk_turma as turma from prova;`, (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    }),

    grade: () => new Promise((resolve, reject) => {
        db.query(`select fk_dia as dia, fk_turma as turma, fk_disciplina as disciplina, fk_professor as professor
        from grade; `, (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    }),

    buscarPorTurma: idTurma => new Promise((resolve, reject) => {
        db.query(`select prova.data_prova as data, disciplina.descricao as disciplina, prova.fk_turma as turma, prova.fk_disciplina_turma as codDisciplina
        from prova
        inner join disciplina on prova.fk_disciplina_turma = disciplina.cod_disciplina
        where prova.fk_turma = ?;`, [idTurma], (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    }),

    buscarPorProva: codigo => new Promise((resolve, reject) => {
        db.query(`select disciplina.nome as disciplina, prova.dataProva as data, turma.id_turma as turma, prova.cod_prova as codigo
        from prova
        inner join disciplina on prova.fk_disciplina = disciplina.id_disciplina
        inner join turma on prova.fk_turma = turma.id_turma
        where provas.cod_prova = ?;`, [codigo], (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    }),

    addProva: (dataProva, disciplina, turma) => new Promise((resolve, reject) => {
        db.query(`insert into prova(data_prova, fk_disciplina_turma, fk_turma) values(?, ?, ?);`, [dataProva, disciplina, turma], (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    }),
    alterProva: (newData, newDisciplina, turma, data) => new Promise((resolve, reject) => {
        db.query(`update prova set data_prova = ?, fk_disciplina_turma = ?
        where  fk_turma = ? and data_prova = ?`, [newData, newDisciplina, turma, data], (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    }),

    delete: (fkTurma, fkData) => new Promise((resolve, reject) => {
        db.query(`delete from prova
        where fk_turma = ? and data_prova = ?`, [fkTurma, fkData], (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    })
}