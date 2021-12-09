const db = require('../db')

module.exports = {
    buscarTodos: () => new Promise((resolve, reject) => {
        db.query(`select cod_evento as codigo,
        descricao,
        data_evento as data,
        aberto,fk_disciplina as disciplina,
        fk_turma as turma,
        fk_professor as professor
        from evento
        order by data_evento asc;`, (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    })
}