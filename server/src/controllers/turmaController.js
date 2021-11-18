const turmaService = require('../service/turmaService')

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {erro: '', results: []}
        let turmas = await turmaService.buscarTodos()

        for(i in turmas){
            json.results.push({
                turma: turmas[i].id_turma,
                sala: turmas[i].sala,
                curso: turmas[i].curso,
                perido: turmas[i].perido
            })
        }

        res.json(json)
    },

    buscarUm: async(req, res) => {
        let json = {erro: '', results: {}}
        let idTurma = req.params.id

        let turma = await turmaService.buscarUm(idTurma)
        if(turma){
            json.results = turma
        }else{
            json.erro = 'Dados não retornados'
        }

        res.json(json)
    },

    addTurma: async(req, res) => {
        let json = {erro: '', results: {}}
        
        let idTurma = req.body.turma
        let sala = parseInt(req.body.sala)
        let curso = req.body.curso
        let periodo = req.body.periodo

        if(idTurma && sala && curso && periodo){
            let turma = await turmaService.addTurma(idTurma, sala, curso, periodo)

            json.results = turma
        }else{
            json.erro = 'Campos não enviados'
        }

        res.json(json)
    },

    alterTurma: async(req, res) => {
        let json = {erro: '', results: {}}

        let idTurma = req.params.id
        let sala = req.body.sala
        let curso = req.body.curso
        let periodo = req.body.periodo

        if(sala && curso && periodo){
           let turma = await turmaService.alterTurma(idTurma, sala, curso, periodo)
           
            json.results = turma
        }else{
            json.erro = 'Campos não enviados'
        }

        res.json(json)
    },

    delete: async(req, res) => {
        let json = {erro: '', results: {}}

        let idTurma = req.params.id
        let turma = await turmaService.delete(idTurma)
        if(turma){
            json.results = turma
        }else{
            json.erro = 'Nem um dado alterado'
        }

        res.json(json)
    }
}

