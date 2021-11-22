const provaService = require('../service/provaService')

module.exports = {
    buscarPorTurma: async(req, res) => {
        let json = {erro: '', results: []}
        let idTurma = req.params.idTurma
        try{
            let prova = await provaService.buscarPorTurma(idTurma)
            for(i in prova){
                json.results.push({
                    data: prova[i].data,
                    disciplina: prova[i].disciplina,
                    codigo: prova[i].codigo,
                    turma: prova[i].turma
                })
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
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
    }
} 