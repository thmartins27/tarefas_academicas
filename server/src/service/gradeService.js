const db = require('../db')

module.exports = {
    buscarUm: idTurma => new Promise((resolve, reject) => {
        db.query(`select grade.turma as turma, disciplina.nome as disciplina, professor.nome as professor, grade.dia_aula as dia
        from grade
        inner join disciplina on grade.disciplina = disciplina.id_disciplina
        inner join professor on grade.professor = professor.cod_professor
        where grade.turma = ?;`, [idTurma], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    })
}