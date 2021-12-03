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
            let grades = await gradeService.buscarTodos()
            for(i in grades){
                if(grades[i].fk_dia == dia && grades[i].fk_turma == turma){
                    throw 'Já existe uma disciplina para está turma, no dia especifico'
                }
            }
            
            try{
                if(dia == '' || turma == '' || professor == '' || disciplina == ''){throw 'Campos em branco'
                }else{
                    let grade = await gradeService.addGrade(dia, turma, professor, disciplina)
                    if(grade.affectedRows == 1) json.result = 'Dados cadastrados com sucesso'
                    else throw 'Erro ao cadastrar dados'
                }
            }catch(e){
                json.erro = e
                console.log(e)
            }

        }catch(e){
            json.erro = e
            console.log(e)
        }
        res.json(json)
    },

    alterDisciplina: async(req, res) => {
        let json = {erro: '', result: {}}
        let paramTurma = req.params.turma
        let paramdia = req.params.dia
        let dia = req.body.dia
        let professor = req.body.professor
        let disciplina = req.body.disciplina
        try{
            if(!dia || !professor || !disciplina)
                throw 'Campos em branco'
            let grade = await gradeService.alterDisciplina(paramTurma, paramdia, dia, professor, disciplina)
            if(grade.affectedRows == 0)
                throw 'Erro ao alterar dados'
            json.result = 'Campos alterados com sucesso'
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