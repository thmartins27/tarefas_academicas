const disciplinaService = require('../service/disciplinaService')

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {erro: '', results: []}
        try{
            let disciplinas = await disciplinaService.buscarTodos()
            if(disciplinas[0]){
                for(i in disciplinas){
                    json.results.push({
                        codigo: disciplinas[i].cod_disciplina,
                        nome: disciplinas[i].descricao,
                        area: disciplinas[i].area
                    })
                }
            }else{
                json.erro = 'Nem dado encontrado'
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
            if(disciplina[0]){
                json.results = {
                    codigo: disciplina[0].cod_disciplina,
                    descricao: disciplina[0].descricao,
                    area: disciplina[0].area
                }
            }else{
                json.erro = `Nenhuma disciplina cadastrada com o codigo: ${cod}`
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }

        res.json(json)
    },
    
    addDisciplina: async(req, res) => {
        let json = {erro: '', results: ''}
        let codigo = req.body.codigo
        let descricao = req.body.descricao
        let area = req.body.area

        if(codigo && descricao && area){
            try{
                let disciplina = await disciplinaService.addDisciplina(codigo, descricao, area)
                if(disciplina.affectedRows == 1){
                    json.results = `Disciplina ${descricao} adicionada com sucesso`
                }
            }catch(e){
                json.erro = `Erro de query ${e}`
                console.log(json.erro)
            }
        }else{
            json.erro = 'H?? campos em branco'
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
                if(disciplina.affectedRows == 1){
                    json.results = 'Dados alterados'
                }
            }catch(e){
                json.erro = `Erro de query: ${e}`
                console.log(json.erro)
            }
        }else{
            json.erro = 'H?? campos em branco'
        }

        res.json(json)
    },

    delete: async(req, res) => {
        let json = {erro: '', results: {}}
        let cod = req.params.cod
        try{
            let disciplina = await disciplinaService.delete(cod)
            if(disciplina.affectedRows == 1){
                json.results = `Disciplina ${cod} deletada`
            }
        }catch(e){
            json.erro = `Erro na query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    }
}