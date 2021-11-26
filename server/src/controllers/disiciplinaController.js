const disciplinaService = require('../service/disciplinaService')

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {erro: '', results: []}
        try{
            let disciplinas = await disciplinaService.buscarTodos()
            for(i in disciplinas){
                json.results.push({
                    id_disciplina: disciplinas[i].cod_disciplina,
                    nome: disciplinas[i].descricao,
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
        let cod = req.params.cod
        try{
            let disciplina = await disciplinaService.buscarUm(cod)
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
        let json = {erro: '', results: ''}
        let cod = req.body.cod
        let descricao = req.body.descricao
        let area = req.body.area

        if(cod && descricao && area){
            try{
                let disciplina = await disciplinaService.addDisciplina(cod, descricao, area)
                if(disciplina){
                    json.results = 'disciplina cadastrada com sucesso'
                }
            }catch(e){
                json.erro = `Erro de query ${e}`
                console.log(json.erro)
            }
        }else{
            json.erro = 'Há campos em branco'
        }

        res.json(json)
    },

    alterDisciplina: async(req, res) => {
        let json = {erro: '', results: ''}
        let cod = req.params.cod
        let descricao = req.body.descricao
        let area = req.body.area
        
        if(descricao && area){
            try{
                let disciplina = await disciplinaService.alterDisciplina(cod, descricao, area)
                if(disciplina){
                    json.results = 'Dados alterados'
                }
            }catch(e){
                json.erro = `Erro de query: ${e}`
                console.log(json.erro)
            }
        }else{
            json.erro = 'Há campos em branco'
        }

        res.json(json)
    },

    delete: async(req, res) => {
        let json = {erro: '', results: {}}
        let cod = req.params.cod
        try{
            let disciplina = await disciplinaService.delete(cod)
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