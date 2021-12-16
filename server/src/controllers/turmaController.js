const turmaService = require('../service/turmaService')

function formatarData(date){
    let data = date.split('-')
    let objData = {
        ano: data[0],
        mes: data[1],
        dia: data[2]
    }
    return objData
}
module.exports = {
    buscarTodos: async(req, res) => {
        let json = {erro: '', results: [], curso: []}
        try{
            let turmas = await turmaService.buscarTodos()
            let curso = await turmaService.curso()
            
            for(i in curso){
                json.curso.push({
                    codigo: curso[i].cod_curso,
                    descricao: curso[i].nome_curso,
                    periodos: curso[i].qtd_periodo
                })
            }
            for(i in turmas){
                
                const data = formatarData(turmas[i].data_inicio)

                json.results.push({
                    turma: turmas[i].id_turma,
                    sala: turmas[i].sala,
                    curso: turmas[i].curso,
                    periodo: turmas[i].periodo,
                    data: `${data.dia}/${data.mes}/${data.ano}`
                })
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(JSON.parse(json.erro))
        }
        res.json(json)
    },

    buscarUm: async(req, res) => {
        let json = {erro: '', results: {}}
        let idTurma = req.params.id
        try{
            let turma = await turmaService.buscarUm(idTurma)
            if(turma){
                json.results = turma
            }else{
                json.erro = 'Dados não retornados'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(JSON.parse(json.erro))
        }
        res.json(json)
    },

    addTurma: async(req, res) => {
        let json = {erro: '', results: {}}
        let idTurma = req.body.turma
        let periodo = req.body.periodo
        let curso = req.body.curso
        let data = req.body.data
        let sala = req.body.sala


        try{
            if(idTurma && sala && curso && periodo){
                let turma = await turmaService.addTurma(idTurma, periodo, curso, data, sala)
                if(turma.affectedRows == 1)
                    json.results = `Turma ${idTurma} cadastrada`
            }else{
                json.erro = 'Campos não enviados'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(JSON.parse(json.erro))
        }
        res.json(json)
    },

    alterTurma: async(req, res) => {
        let json = {erro: '', results: {}}
        let idTurma = req.params.id
        let sala = req.body.sala
        let curso = req.body.curso
        let periodo = req.body.periodo
        try{
            if(sala && curso && periodo){
               let turma = await turmaService.alterTurma(idTurma, sala, curso, periodo)
               
                json.results = turma
            }else{
                json.erro = 'Campos não enviados'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(JSON.parse(json.erro))
        }
        res.json(json)
    },

    delete: async(req, res) => {
        let json = {erro: '', results: {}}
        let idTurma = req.params.id
        try{
            let turma = await turmaService.delete(idTurma)
            if(turma){
                json.results = turma
            }else{
                json.erro = 'Nem um dado alterado'
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(JSON.parse(json.erro))
        }
        res.json(json)
    }
}

