const db = require('../db')

module.exports = {
    buscarTodos: () => new Promise((resolve, reject) => {
        db.query(`select * from grade`, (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    })
    ,
    buscarUm: idTurma => new Promise((resolve, reject) => {
        db.query(`select dia_semana.dia as dia, turma.id_turma as turma, professor.nome as nome_professor, professor.sobrenome as sobrenome_professor, disciplina.descricao as disciplina
        from grade
        inner join dia_semana on grade.fk_dia = dia_semana.id
        inner join turma on grade.fk_turma = turma.id_turma
        inner join professor on grade.fk_professor = professor.cod_professor
        inner join disciplina on grade.fk_disciplina = disciplina.cod_disciplina
        where grade.fk_turma = ?;`, [idTurma], (erro, results) => {
            if(erro) reject(erro)
            resolve(results)
        })
    }),

    addGrade: (dia, turma, professor, disciplina) => new Promise((resolve, reject) => {
        db.query(`insert into grade(fk_dia, fk_turma, fk_professor, fk_disciplina)
        values(?, ?, ?, ?)`, [dia, turma, professor, disciplina], (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    }),

    alterDisciplina: (paramTurma, paramDia, dia, professor, disciplina) => new Promise((resolve, reject) => {
        db.query(`update grade set fk_professor = ?, fk_discplina = ?, fk_dia = ?
        where fk_turma = ? and fk_dia = ?;`, [professor, disciplina, dia, paramTurma, paramDia], (erro, result) => {
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