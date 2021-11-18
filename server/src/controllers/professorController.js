const professorService = require('../service/professorService')

module.exports = {
    buscarTodos: async (req, res) => {
        let json = {erro: '', results: []}
        try{
            let professor = await professorService.buscarTodos()
            for(i in professor){
                json.results.push({
                    codigo: professor[i].cod_professor,
                    nome: professor[i].nome,
                    sobrenome: professor[i].sobrenome
                })
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    },

    buscarUm: async (req, res) => {
        let json = {erro: '', results: {}}
        let codigo = req.params.codigo
        try{
            let professor = await professorService.buscarUm(codigo)
            if(professor){
                json.results = professor
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    },

    addProfessor: async(req, res) => {
        let json = {erro: '', results: {}}
        let codigo = req.body.codigo
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        try{
            if(codigo && nome && sobrenome){
                let professor = await professorService.addProfessor(codigo, nome, sobrenome)
    
                json.results = {
                    id: professor,
                    codigo,
                    nome,
                    sobrenome
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

    alterProfessor: async(req, res) => {
        let json = {erro: '', results: {}}
        let codigo = req.params.codigo
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        try{
            let professor = await professorService.alterProfessor(codigo, nome, sobrenome)
            if(professor){
                json.results = professor
            }else{
                json.erro = 'Campos não enviados'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }

        res.json(json)

    },

    delete: async(req, res) => {
        let json = {erro: '', results: {}}
        let codigo = req.params.codigo
        try{
            let professor = await professorService.delete(codigo)
            if(professor){
                json.results = professor
            }else{
                json.erro = 'Campos não enviados'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    }
}