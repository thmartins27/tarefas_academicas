const gradeService = require('../service/gradeService')

module.exports = {
    buscarUm: async(req, res) => {
        let json = {erro: '', result: []}
        let idTurma = req.params.idTurma
        try{
            let grade = await gradeService.buscarUm(idTurma)
            if(grade[0]){
                for(i in grade){
                    json.result.push({
                        turma: grade[i].turma,
                        dia: grade[i].dia,
                        disciplina: grade[i].disciplina,
                        professor: `${grade[i].nome_professor} ${grade[i].sobrenome_professor}`
                    })
                }
            }else{
                throw 'Nenhum dado retornado'
            }
        }catch(e){
            json.erro = e
            console.log(json.erro)
        }
        res.json(json)
    },

    addGrade: async(req, res) => {
        let json = {erro: '', result: {}}
        let dia = parseInt(req.body.dia)
        let turma = req.body.turma
        let professor = req.body.professor
        let disciplina = req.body.disciplina
        try{
            if(!dia && !turma && !professor && !disciplina)
                throw 'campos não preenchidos'
            let grade = await gradeService.addGrade(dia, turma, professor, disciplina)
            if(grade[0].affectedRows == 0)
                throw 'Erro ao enviar dados ao banco'
            json.result = 'Dados salvos com sucesso'
        }catch(e){
            json.erro = e
            console.log(e)
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