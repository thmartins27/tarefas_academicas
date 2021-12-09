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
                if(grades[i].fk_turma == turma && grades[i].fk_dia == dia)
                    throw 'já existe uma discplina cadastrada nesse dia'
            }
            try{
                let grade = await gradeService.addGrade(dia, turma, professor, disciplina)
                if(grade.affectedRows == 0)
                    throw 'Erro ao adicionar os dados'
                json.result = 'Dados cadastrados com sucesso'
            }catch(e){
                json.erro = e
                console.log(json.erro)
            }
        }catch(e){
            json.erro = e
            console.log(json.erro)
        }
        
        res.json(json)
    },

    alterGrade: async(req, res) => {
        let json = {erro: '', result: {}}
        let paramTurma = req.params.turma
        let paramDia = req.params.dia
        let dia = parseInt(req.body.dia)
        let professor = req.body.professor
        let disciplina = req.body.disciplina

        try{
            if(dia == '') dia = paramDia
            let grades = await gradeService.buscarTodos()
            for(i in grades){
                if(grades[i].fk_turma == paramTurma && dia != paramDia && grades[i].fk_dia == dia)
                    throw 'Já existe uma disciplina cadastrada nesse dia'
            }

            try{
                let grade = await gradeService.alterGrade(paramTurma, paramDia, professor, disciplina, dia)
                if(grade.affectedRows == 0)
                    throw 'Dados não alterados'
                json.result = 'Dados alterados'
            }catch(e){
                json.erro = e
                console.log(json.erro)
            }

        }catch(e){
            json.erro = e
            console.log(json.erro)
        }

        res.json(json)
    },

    delete: async(req, res) => {
        let json = {erro: '', result:{}}
        let turma = req.params.turma
        let dia = req.params.dia
        let grade

        try{
            if(!dia){
                grade = await gradeService.delete(turma)
                if(grade.affectedRows == 0)
                    throw 'Erro ao deletar dados'
                json.result = `Grade da turma ${turma} deletada`
            }else{
                grade = await gradeService.deleteDia(turma, dia)
                if(grade.affectedRows == 0)
                    throw 'Erro ao deletar dados'
                json.result = `Disciplina deletada da grade`
            }
        }catch(e){
            json.erro = e
            console.log(json.erro)
        }
        
        res.json(json)
    }
}