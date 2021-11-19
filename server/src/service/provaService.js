const db = require('../db')

module.exports = {
    buscarUm: idTurma => new Promise((resolve, reject) => {
        db.query(`select disciplina.nome as disciplina, provas.data_prova as data, turma.id_turma as turma
        from provas
        inner join disciplina on provas.fk_disciplina = disciplina.id_disciplina
        inner join turma on provas.fk_turma = turma.id_turma
        where provas.fk_turma = ?;`, [idTurma], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    })
}