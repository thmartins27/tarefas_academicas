const alunosService = require('../service/alunoService')
const turmaService = require('../service/turmaService')

module.exports = {
    buscarTodos: async(req, res) => {
        let json = {erro: '', results: []}
        let alunos = await alunosService.buscarTodos()
        for(i in alunos){
            json.results.push({
                matricula: alunos[i].matricula,
                nome: alunos[i].nome,
                sobrenome: alunos[i].sobrenome,
                turma: alunos[i].turma
            })
        }
        return res.json(json)
    },

    buscarUm: async(req, res) => {

        let json = {erro:'', results: {}}
        
        let matricula = req.params.matricula
        
        let aluno = await alunosService.buscarUm(matricula)

        if(aluno){
            json.results = aluno
        }else{
            json.erro = 'Não encontrado'
        }

        res.json(json)
    },

    addAluno: async(req, res) => {
        let json = {erro: '', results: {}}
        
        
        let matricula = req.body.matricula
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let turma = req.body.turma
        
        let idTurma = await turmaService.buscarUm(turma)

        if(idTurma){    
            let aluno = await alunosService.addAluno(matricula, nome, sobrenome, turma)
            
            if(aluno){
                json.results = {
                    id: aluno,
                    matricula,
                    nome,
                    sobrenome,
                    turma
                }
            }
        }else{
            json.erro = 'Não existe essa turma'
        }

        res.json(json)
    },

    alterAluno: async(req, res) => {
        let json = {erro: '', results: {}}

        let matricula = req.params.matricula
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let turma = req.body.turma

        let aluno = await alunosService.alterAluno(matricula, nome, sobrenome, turma)

        if(aluno){
            json.results = {
                id: aluno,
                matricula,
                nome,
                sobrenome,
                turma
            }
        }

        res.json(json)
    },

    delete: async(req, res) => {
        let json = {erro: '', results: {}}
        let matricula = req.params.matricula
        let aluno = await alunosService.delete(matricula)
        if(aluno){
            json.results = aluno
        }else{
            json.erro = 'Erro ao receber informações'
        }

        res.json(json)
    }
}