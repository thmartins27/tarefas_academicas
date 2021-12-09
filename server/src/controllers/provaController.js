const provaService = require('../service/provaService')

function formatarData(date){
    let data = date.split('-')
    let objData = {
        ano: data[0],
        mes: data[1],
        dia: data[2]
    }
    return objData
}

function dataTurmaProva(array, data, turma){
    let tem = false
    for(i in array){
        if(array[i].turma == turma && array[i].data == data){
            tem = true
            break
        }
    }
    return tem
}

function disciplinaProva(array, disciplina, turma){
    let tem = false
    for(i in array){
        if(array[i].turma == turma && array[i].disciplina == disciplina){
            tem = true
            break
        }
    }

    return tem
}

function gradeDisciplina(array, turma, disciplina){
    let tem = false
    for(i in array){
        if(array[i].turma == turma && array[i].disciplina == disciplina){
            tem = true
            break
        }
    }
    return tem
}

module.exports = {
    buscarPorTurma: async(req, res) => {
        let json = {erro: '', result: []}
        let turma = req.params.turma
        let provas, grade
        try{
            provas = await provaService.buscarPorTurma(turma)
            if(provas[0]){
                for(i in provas){
                    let data = formatarData(provas[i].data)
                    json.result.push({
                        data: `${data.dia}/${data.mes}/${data.ano}`,
                        disciplina: provas[i].disciplina,
                    })
                }
            }else
                throw 'Nenhum dado retornado'
        }catch(e){
            json.erro = e
            console.log(json.erro)
        }
        res.json(json)
    },

    buscarPorProva: async(req, res) => {
        let json = {erro: '', result: []}
        let codigo = req.params.codigo
        try{
            let prova = await provaService.buscarPorProva(codigo)
            for(i in prova){
                json.result.push({
                    data: prova[i].data,
                    codigo: prova[i].codigo,
                    disciplina: prova[i].disciplina,
                    turma: prova[i].turma
                })
            }
            json.result = data
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }

        res.json(json)
    },

    addProva: async(req, res) => {
        const json = {erro: '', result: {}}
        const dataProva = req.body.data
        const disciplina = req.body.disciplina
        const turma = req.body.turma
        try{
            if(!dataProva || !disciplina || !turma)
                throw 'Há campos em branco'
            const grade = await provaService.grade()
            if(gradeDisciplina(grade, turma, disciplina) == false)
                throw 'Disciplina fora da grade'
            
            const provas = await provaService.buscarTodos()
            provas.map(i => {
                if(i.data == dataProva && i.turma == turma)
                    throw 'Já há uma prova marcada nessa data'
                if(i.turma == turma && i.disciplina == disciplina)
                    throw 'Prova ja marcada para essa disciplina'
            })
            const prova = await provaService.addProva(dataProva, disciplina, turma)
            if(prova.affectedRows == 0)
                throw 'Erro ao enviar dados'
            json.result = 'Prova marcada!'
        }catch(e){
            json.erro = e
            console.log(e)
        }
        res.json(json)
    },

    alterProva: async(req, res) => {
        const json = {erro:'', result: {}}
        const turma = req.params.turma
        const dia = req.query.d
        const mes = req.query.m
        const ano = req.query.y
        const data = `${ano}-${mes}-${dia}`
        let newData = req.body.data
        let newDisciplina = req.body.disciplina
        try{

            const provas = await provaService.buscarTodos()
            if(dataTurmaProva(provas,data,turma) == false){
                throw 'Nenhum dado encontrado para alterar'
            }

            if(!newData && !newDisciplina)
                throw `Campos em branco`
            else if(!newData && newDisciplina){
                newData = data
            }else if(newData && !newDisciplina){
                try{
                    const provas = await provaService.buscarTodos()
                    for(i in provas){
                        if(provas[i].data == data && provas[i].turma == turma){
                            newDisciplina = provas[i].disciplina
                        }
                    }
                }catch(e){
                    json.erro = e
                    console.log(e)
                }
            }
            
            if(disciplinaProva(provas, newDisciplina, turma) == true)
                throw 'Disciplina já cadastrada'
            const grade = await provaService.grade()
            if(gradeDisciplina(grade, turma, newDisciplina)==false)
                throw 'Disciplina fora da grade'
            const prova = await provaService.alterProva(newData, newDisciplina, turma, data)
            if(prova.affectedRows == 0)
                throw 'Erro ao alterar dados'
            json.result = 'Dados alterados com sucesso'
        }catch(e){
            json.erro = e
            console.log(e)
        }
        res.json(json)
    },

    delete: async(req, res) => {
        const json = {erro: '', result: {}}
        const turma = req.params.turma
        const dia = req.query.d
        const mes = req.query.m
        const ano = req.query.y
        const data = `${ano}-${mes}-${dia}`
        //sa/prova/turma?d&m&y
        try{
            const prova = await provaService.delete(turma, data)
            if(prova.affectedRows == 0)
                throw 'Erro ao deletar dados'
            json.result = 'Dados deletados'
        }catch(e){
            json.erro = e
            console.log(e)
        }

        res.json(json)
    }
}