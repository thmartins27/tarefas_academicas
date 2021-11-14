const professorService = require('../service/professorService')

module.exports = {
    buscarTodos: async (req, res) => {
        
        try{

            let json = {erro: '', results: []}
            
            let professor = await professorService.buscarTodos()
            
            for(i in professor){
                json.results.push({
                    codigo: professor[i].cod_professor,
                    nome: professor[i].nome,
                    sobrenome: professor[i].sobrenome
                })
            }
            res.json(json)

        }catch(erro){
            console.log(`Houve um erro: ${erro}`)
        }
    },

    buscarUm: async (req, res) => {

        let json = {erro: '', results: {}}

        let codigo = req.params.codigo

        let professor = await professorService.buscarUm(codigo)

        if(professor){
            json.results = professor
        }

        res.json(json)
    },

    addProfessor: async(req, res) => {

        let json = {erro: '', results: {}}

        let codigo = req.body.codigo
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome

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

        res.json(json)

    },

    alterProfessor: async(req, res) => {
        
        let json = {erro: '', results: {}}

        let codigo = req.params.codigo
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome

        let professor = await professorService.alterProfessor(codigo, nome, sobrenome)

        if(professor){
            json.results = professor
        }else{
            json.erro = 'Campos não enviados'
        }

        res.json(json)

    },

    delete: async(req, res) => {
        let json = {erro: '', results: {}}

        let codigo = req.params.codigo

        let professor = await professorService.delete(codigo)

        if(professor){
            json.results = professor
        }else{
            json.erro = 'Campos não enviados'
        }

        res.json(json)
    }
}