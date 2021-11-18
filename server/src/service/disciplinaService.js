const db = require('../db')

module.exports = {
    buscarTodos: () => new Promise((resolve, reject) => {
        db.query('select * from disciplina', (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    buscarUm: id => new Promise((resolve, reject) => {
        db.query('select * from disciplina where id_disciplina = ?', [id], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    addDisciplina: (id, nome, area) => new Promise((resolve, reject) => {
        db.query(`insert into disciplina(id_disciplina, nome, area)
        values(?, ?, ?);`, [id, nome, area], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    alterDisciplina: (id, nome, area) => new Promise((resolve, reject) => {
        db.query(`update disciplina
        set nome = ?, area = ?
        where id_disciplina = ?;`, [nome, area, id], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    delete: id => new Promise((resolve, reject) => {
        db.query('delete from disciplina where id_disciplina = ?;', [id], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    })
}