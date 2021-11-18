const alunosService = require('../service/alunoService')

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {erro: '', results: []}
        try{
            let alunos = await alunosService.buscarTodos()
            for(i in alunos){
                json.results.push({
                    matricula: alunos[i].matricula,
                    nome: alunos[i].nome,
                    sobrenome: alunos[i].sobrenome,
                    turma: alunos[i].turma
                })
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(JSON.parse(json.erro))
        }
        res.json(json)
    },

    buscarUm: async(req, res) => {
        let json = {erro:'', results: {}}
        let matricula = req.params.matricula
        try{
            let aluno = await alunosService.buscarUm(matricula)
            if(aluno){
                json.results = aluno
            }
        }catch{
            json.erro = `Erro de query ${e}`
            console.log(json.erro)
        }
        res.json(json)
    },

    addAluno: async(req, res) => {
        let json = {erro: '', results: {}}
        let matricula = req.body.matricula
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let turma = req.body.turma
        try{
            if(matricula && nome && sobrenome && turma){
                let aluno = await alunosService.addAluno(matricula, nome, sobrenome, turma)
                if(aluno){
                    json.results = {
                        matricula,
                        nome,
                        sobrenome,
                        turma
                    }
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

    alterAluno: async(req, res) => {
        let json = {erro: '', results: {}}
        let matricula = req.params.matricula
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let turma = req.body.turma
        try{
            if(nome && sobrenome && turma){
                let aluno = await alunosService.alterAluno(matricula, nome, sobrenome, turma)
                if(aluno){
                    json.results = {
                        matricula,
                        nome,
                        sobrenome,
                        turma
                    }
                }
            }else{
                json.erro = 'Campos não enviados'
            }
        }catch(e){
            json.erro = `Erro ao executar query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    },

    delete: async(req, res) => {
        let json = {erro: '', results: {}}
        let matricula = req.params.matricula
        try{
            let aluno = await alunosService.delete(matricula)
            if(aluno.matricula){
                json.results = aluno
            }else{
                json.erro = 'Não encontrado'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    }
}