const db = require('../db')

module.exports = {
    buscarTodos: () => new Promise((resolve, reject) => {
        db.query('select * from disciplina', (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    buscarUm: cod => new Promise((resolve, reject) => {
        db.query('select * from disciplina where cod_disciplina = ?', [cod], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    addDisciplina: (cod, descricao, area) => new Promise((resolve, reject) => {
        db.query(`insert into disciplina(cod_disciplina, descricao, area)
        values(?, ?, ?);`, [cod, descricao, area], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    alterDisciplina: (cod, descricao, area) => new Promise((resolve, reject) => {
        db.query(`update disciplina
        set descricao = ?, area = ?
        where cod_disciplina = ?;`, [descricao, area, cod], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    delete: cod => new Promise((resolve, reject) => {
        db.query('delete from disciplina where cod_disciplina = ?;', [cod], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    })
}