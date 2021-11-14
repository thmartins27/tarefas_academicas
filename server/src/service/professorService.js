const db = require('../db')

module.exports = {
    buscarTodos: () => new Promise((resolve, reject) => {
        db.query('select * from professor', (erro, results) => {
            if(erro) {reject(erro); return}
            resolve(results)
        })
    }),

    buscarUm: (codigo) => new Promise((resolve, reject) => {
        db.query('select * from professor where cod_professor = ?', [codigo], (erro, results) => {
            if(erro) {reject(erro); return}
            resolve(results)
        })
    }),

    addProfessor: (codigo, nome, sobrenome) => new Promise((resolve, reject) => {
        db.query('insert into professor(cod_professor, nome, sobrenome) values(?,?,?);', [codigo, nome, sobrenome], (erro, results) => {
            if(erro) {reject(erro); return}
            resolve(results)
        })
    }),

    alterProfessor: (codigo, nome, sobrenome) => new Promise((resolve, reject) => {
        db.query('update professor set nome = ?, sobrenome = ? where cod_professor = ?', [nome, sobrenome, codigo], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })

    }),

    delete: codigo => new Promise((resolve, reject) => {
        db.query('delete from professor where cod_professor = ?', [codigo], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    })
}