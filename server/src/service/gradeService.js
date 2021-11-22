const db = require('../db')

module.exports = {
    buscarUm: idTurma => new Promise((resolve, reject) => {
        db.query(`select grade.turma as turma, disciplina.nome as disciplina, professor.nome as nome, professor.sobrenome as sobrenome, grade.dia_disciplina as dia
        from grade
        inner join disciplina on grade.disciplina = disciplina.id_disciplina
        inner join professor on grade.professor = professor.cod_professor
        where grade.turma = ?;`, [idTurma], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    addGrade: (turma, disciplina, professor, dia) => new Promise((resolve, reject) => {
        db.query(`insert into grade(turma, disciplina, professor, dia_disciplina)
        values(?,?,?,?);`, [turma, disciplina, professor, dia], (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    }),

    alterDisciplina: (idTurma, dia, disciplina, professor) => new Promise((resolve, reject) => {
        db.query(`update grade set disciplina = ?, professor = ?
        where turma = ? and dia_disciplina = ?;`, [disciplina, professor, idTurma, dia], (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    }),

    deleteDia: (idTurma, dia) => new Promise((resolve, reject) => {
        db.query(`delete from grade where turma = ? and dia_disciplina = ?`, [idTurma, dia], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    delete: idTurma => new Promise((resolve, reject) => {
        db.query(`delete from grade where turma = ?`, [idTurma], (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    })
}