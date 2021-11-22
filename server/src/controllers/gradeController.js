const gradeService = require('../service/gradeService')
const dias = ['Sabado', 'Domingo', 'Segunda-Feira', 'Terça-feira', 'Quarta-Feira', 'Quinta-feira', 'Sexta-Feira']

module.exports = {
    buscarUm: async(req, res) => {
        let json = {erro: '', result: []}
        let idTurma = req.params.idTurma
        try{
            let grade = await gradeService.buscarUm(idTurma)
            for(i in grade){
                json.result.push({
                    dia: grade[i].dia,
                    turma: grade[i].turma,
                    disciplina: grade[i].disciplina,
                    professor: grade[i].nome + ' ' + grade[i].sobrenome
                })
            }
        }catch(e){
            json.erro = `Erro na query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    },

    addGrade: async(req, res) => {
        let json = {erro: '', result: {}}
        let turma = req.body.turma
        let disciplina = req.body.disciplina
        let professor = req.body.professor
        let dia = req.body.dia

        if(turma && disciplina && professor && dia){
            try{
                let grade = await gradeService.addGrade(turma, disciplina, professor, dia)
                if(grade){
                    json.result = {
                        id: grade,
                        turma, disciplina, professor, dia
                    }
                }
            }catch(e){
                erro.json = `Erro de query: ${e}`
                console.log(json.erro)
            }
        }else{
            json.erro = 'Campos não enviados'
        }

        res.json(json)
    },

    alterDisciplina: async(req, res) => {
        let json = {erro: '', result: {}}
        let idTurma = req.params.idTurma
        let dia = req.params.dia
        let disciplina = req.body.disciplina
        let professor = req.body.professor
        try{
            if(disciplina && professor){
                let grade = gradeService.alterDisciplina(idTurma, dia, disciplina, professor)
                json.result = grade
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
        let idTurma = req.params.idTurma
        let dia = req.params.dia

        if(idTurma && dia){
            try{
                let grade = await gradeService.deleteDia(idTurma, dia)
                json.results = grade
            }catch(e){
                json.erro = `Erro de query ${e}`
                console.log(json.erro)
            }
        }else if(idTurma){
            try{
                let grade = await gradeService.delete(idTurma)
                json.results = grade
            }catch(e){
                json.erro = `Erro de query ${e}`
                console.log(json.erro)
            }
        }else{
            json.erro = 'Campos não enviados'
        }

        res.json(json)
    }
}