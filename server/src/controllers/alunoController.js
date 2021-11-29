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
                    turma: alunos[i].fk_turma,
                    CPF: alunos[i].cpf
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
            if(aluno[0]){
                json.results = {
                    nome: aluno[0].nome,
                    matricula: aluno[0].matricula,
                    turma: aluno[0].fk_turma,
                    CPF: aluno[0].cpf
                }
            }else{
                json.results = 'Nem dado encontrado'
            }
        }catch{
            json.erro = `Erro de query ${e}`
            console.log(json.erro)
        }
        res.json(json)
    },

    addAluno: async(req, res) => {
        let json = {erro: '', results: ''}
        let matricula = req.body.matricula
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let turma = req.body.turma
        let cpf = req.body.cpf
        try{
            if(matricula && nome && sobrenome && turma, cpf){
                let aluno = await alunosService.addAluno(matricula, nome, sobrenome, turma, cpf)
                if(aluno){
                    json.results = `Aluno ${nome} adicionado com sucesso`
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
        let json = {erro: '', results: ''}
        let matricula = req.params.matricula
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let turma = req.body.turma
        let cpf = req.body.cpf
        
        if(nome && sobrenome && turma && cpf){
            try{
                let aluno = await alunosService.alterAluno(matricula, nome, sobrenome, turma, cpf)
                if(aluno.cpf){
                    json.results = 'Aluno alterado com sucesso'
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
        let json = {erro: '', results: ''}
        let matricula = req.params.matricula
        try{
            let aluno = await alunosService.delete(matricula)
            if(!aluno.matricula){
                json.results = "Aluno deletado com sucesso"
            }else{
                json.erro = 'Erro ao deletar aluno'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    }
}