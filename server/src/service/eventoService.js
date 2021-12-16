const db = require('../db')

module.exports = {
    eventos: () => new Promise((resolve, reject) => {
        db.query(`select 
        cod_evento as codigo,
        descricao,
        data_evento as evento,
        aberto,
        fk_disciplina as disciplina,
        fk_turma as turma,
        fk_professor as professor
        from evento`)
    }),

    buscarTodos: () => new Promise((resolve, reject) => {
        db.query(`select
        evento.cod_evento as codigo,
        evento.descricao,
        evento.data_evento as data,
        evento.aberto as aberto,
        disciplina.cod_disciplina as disciplina,
        turma.id_turma as turma,
        professor.nome as nomeProfessor, professor.sobrenome as sobrenomeProfessor
        from evento
        left join disciplina on evento.fk_disciplina = disciplina.cod_disciplina
        left join turma on evento.fk_turma = turma.id_turma
        left join professor on evento.fk_professor = professor.cod_professor
        order by evento.data_evento asc;`, (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    }),
    
    addEvento: (codigo, descricao, data, aberto, disciplina, turma, professor) => new Promise((resolve, reject) => {
        db.query(`insert into evento(
            cod_evento,
            descricao,
            data_evento,
            aberto,
            fk_disciplina,
            fk_turma,
            fk_professor
        ) values(?, ?, ?, ?, ?, ?, ?);`,
        [codigo, descricao, data, aberto, disciplina, turma, professor], (erro, result) => {
            if(erro) reject(erro)
            resolve(result)
        })
    })
}