const turmaService = require('../service/turmaService')

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {erro: '', results: []}
        try{
            let turmas = await turmaService.buscarTodos()
            for(i in turmas){
                json.results.push({
                    turma: turmas[i].id_turma,
                    sala: turmas[i].sala,
                    curso: turmas[i].curso,
                    perido: turmas[i].perido
                })
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(JSON.parse(json.erro))
        }
        res.json(json)
    },

    buscarUm: async(req, res) => {
        let json = {erro: '', results: {}}
        let idTurma = req.params.id
        try{
            let turma = await turmaService.buscarUm(idTurma)
            if(turma){
                json.results = turma
            }else{
                json.erro = 'Dados não retornados'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(JSON.parse(json.erro))
        }
        res.json(json)
    },

    addTurma: async(req, res) => {
        let json = {erro: '', results: {}}
        let idTurma = req.body.turma
        let sala = parseInt(req.body.sala)
        let curso = req.body.curso
        let periodo = req.body.periodo
        try{
            if(idTurma && sala && curso && periodo){
                let turma = await turmaService.addTurma(idTurma, sala, curso, periodo)
    
                json.results = turma
            }else{
                json.erro = 'Campos não enviados'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(JSON.parse(json.erro))
        }
        res.json(json)
    },

    alterTurma: async(req, res) => {
        let json = {erro: '', results: {}}
        let idTurma = req.params.id
        let sala = req.body.sala
        let curso = req.body.curso
        let periodo = req.body.periodo
        try{
            if(sala && curso && periodo){
               let turma = await turmaService.alterTurma(idTurma, sala, curso, periodo)
               
                json.results = turma
            }else{
                json.erro = 'Campos não enviados'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(JSON.parse(json.erro))
        }
        res.json(json)
    },

    delete: async(req, res) => {
        let json = {erro: '', results: {}}
        let idTurma = req.params.id
        try{
            let turma = await turmaService.delete(idTurma)
            if(turma){
                json.results = turma
            }else{
                json.erro = 'Nem um dado alterado'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(JSON.parse(json.erro))
        }
        res.json(json)
    }
}

