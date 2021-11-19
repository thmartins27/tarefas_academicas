const provaService = require('../service/provaService')

//const data = new Date()

function formatarData(date){
    const dia = new Array('domingo', 'segunda-feira', 'terca-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sabado')
    const mes = new Array('janeiro', 'fevereiro', 'março', 'abril', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro')
    const d = new Date

    const results = {
        ano: d.getUTCFullYear(date),
        mes: mes[d.getMonth(date)],
        dia: dia[d.getDay(date)],
        data: d.getDate(date)
    }

    return results
}

console.log(formatarData('2021-01-21').mes)

module.exports = {
    buscarUm: async(req, res) => {
        let json = {erro: '', results: []}
        let idTurma = req.params.idTurma
        try{
            let prova = await provaService.buscarUm(idTurma)
            for(i in prova){
                json.results.push({
                    data: prova[i].data,
                    disciplina: prova[i].disciplina,
                    turma: prova[i].turma
                })
            }
        }catch(e){
            json.erro = `Erro de query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    }
}