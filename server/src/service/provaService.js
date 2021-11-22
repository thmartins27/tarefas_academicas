const db = require('../db')

module.exports = {
    buscarPorTurma: idTurma => new Promise((resolve, reject) => {
        db.query(`select disciplina.nome as disciplina, provas.data as data, turma.id_turma as turma, provas.cod_prova as codigo
        from provas
        inner join disciplina on provas.fk_disciplina = disciplina.id_disciplina
        inner join turma on provas.fk_turma = turma.id_turma
        where provas.fk_turma = ?;`, [idTurma], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    buscarPorProva: codigo => new Promise((resolve, reject) => {
        db.query(`select disciplina.nome as disciplina, provas.data as data, turma.id_turma as turma, provas.cod_prova as codigo
        from provas
        inner join disciplina on provas.fk_disciplina = disciplina.id_disciplina
        inner join turma on provas.fk_turma = turma.id_turma
        where provas.cod_prova = ?;`, [codigo], (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    })
}