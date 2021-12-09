const eventoService = require('../service/eventoService')

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
    buscar: async(req, res) => {
        const json = {erro:'', result: []}
        const turma = req.params.turma

        try{
            const evento = await eventoService.buscarTodos()
            for(i in evento){
                const data = formatarData(evento[i].data)
                json.result.push({
                    codigo: evento[i].codigo,
                    descricao: evento[i].descricao,
                    aberto: (evento[i].aberto == 1) ? 'sim' : 'não',
                    data: `${data.dia}/${data.mes}/${data.ano}`
                })
            }
        }catch(e){
            json.erro = e
            console.log(e)
        }

        res.json(json)
    }
}