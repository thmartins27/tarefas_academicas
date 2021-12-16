const professorService = require('../service/professorService')

module.exports = {
    buscarTodos: async (req, res) => {
        let json = {erro: '', results: []}
        try{
            let professor = await professorService.buscarTodos()
            if(professor[0]){
                for(i in professor){
                    json.results.push({
                        codigo: professor[i].cod_professor,
                        nome: professor[i].nome,
                        sobrenome: professor[i].sobrenome
                    })
                }
            }else{
                json.erro = 'Nenhum dado encontrado'
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
            if(professor[0]){
                json.results = {
                    codigo: professor[0].cod_professor,
                    nome: professor[0].nome,
                    sobrenome: professor[0].sobrenome
                }
            }else{
                json.erro = `${codigo} não encontrado`
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    },

    addProfessor: async(req, res) => {
        let json = {erro: '', results: ''}
        let codigo = req.body.codigo
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        try{
            if(codigo && nome && sobrenome){
                let professor = await professorService.addProfessor(codigo, nome, sobrenome)
                if(professor.affectedRows == 1){
                    json.results = `Professor ${codigo} adicionado com sucesso`
                }else{
                    json.erro = 'Erro ao cadastrar professor'
                }
            }else{
                json.erro = 'Campos não preenchidos'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    },

    alterProfessor: async(req, res) => {
        let json = {erro: '', results: ''}
        let codigo = req.params.codigo
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        
        if(nome && sobrenome){
            try{
                let aluno = await professorService.alterProfessor(codigo, nome, sobrenome)
                if(aluno.affectedRows == 1){
                    json.results = 'Dados alterados com sucesso'
                }else{
                    json.erro = 'Nenhum dado foi alterado'
                }
            }catch(e){
                json.erro = `Erro de query: ${e}`
                console.log(json.erro)
            }
        }else{
            json.erro = 'Campos não enviados'
        }
        res.json(json)
    },

    delete: async(req, res) => {
        let json = {erro: '', results: {}}
        let codigo = req.params.codigo
        try{
            let professor = await professorService.delete(codigo)
            if(professor.affectedRows == 0)
                throw 'Erro ao deletar dados'
            json.results = 'Dados deletados'
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    }
}