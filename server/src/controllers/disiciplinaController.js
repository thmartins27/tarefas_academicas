const disciplinaService = require('../service/disciplinaService')

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {erro: '', results: []}
        try{
            let disciplinas = await disciplinaService.buscarTodos()
            for(i in disciplinas){
                json.results.push({
                    id_disciplina: disciplinas[i].id_disciplina,
                    nome: disciplinas[i].nome,
                    area: disciplinas[i].area
                })
            }
        }catch(e){
            json.erro = `Erro de query ${e}`
            console.log(json.erro)
        }
        res.json(json)
    },

    buscarUm: async(req, res) => {
        let json = {erro: '', results: {}}
        let id = req.params.id
        try{
            let disciplina = await disciplinaService.buscarUm(id)
            if(disciplina){
                json.results = disciplina
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }

        res.json(json)
    },
    
    addDisciplina: async(req, res) => {
        let json = {erro: '', results: {}}
        let id_disciplina = req.body.id_disciplina
        let nome = req.body.nome
        let area = req.body.area
        try{
            if(id_disciplina && nome && area){
                let disciplina = await disciplinaService.addDisciplina(id_disciplina, nome, area)
                if(disciplina){
                    json.results = disciplina
                }
            }else{
                json.erro = 'Campos não enviados'
            }

        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }

        res.json(json)
    },

    alterDisciplina: async(req, res) => {
        let json = {erro: '', results: {}}
        let id = req.params.id
        let nome = req.body.nome
        let area = req.body.area
        try{
            if(nome && area){
                let disciplina = await disciplinaService.alterDisciplina(id, nome, area)
                if(disciplina){
                    json.results = disciplina
                }
            }else{
                json.erro = 'Campos não enviados'
            }
        }catch(e){
            json.erro = `Erro na query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    },

    delete: async(req, res) => {
        let json = {erro: '', results: {}}
        let id = req.params.id
        try{
            let disciplina = await disciplinaService.delete(id)
            if(disciplina){
                json.results = disciplina
            }
        }catch(e){
            json.erro = `Erro na query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    }
}