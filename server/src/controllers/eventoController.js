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

function verficarEvento(array, codigo){
    let tem = false
    for(i in array){
        if(array[i].codigo == codigo){
            tem = true; break;
        }
    }
    return tem
}

module.exports = {
    buscar: async(req, res) => {
        const json = {erro:'', result: []}
        try{
            const evento = await eventoService.buscarTodos()
            for(i in evento){
                const data = formatarData(evento[i].data)
                json.result.push({
                    codigo: evento[i].codigo,
                    descricao: evento[i].descricao,
                    aberto: (evento[i].aberto == 1) ? 'Sim' : 'Não',
                    data: `${data.dia}/${data.mes}/${data.ano}`,
                    professor: `${evento[i].nomeProfessor} ${evento[i].sobrenomeProfessor}`,
                    turma: evento[i].turma,
                    disciplina: evento[i].disciplina
                })
            }
        }catch(e){
            json.erro = e
            console.log(e)
        }
        res.json(json)
    },

    addEvento: async(req, res) => {
        const json = {erro:'', result: {}}
        //body
        const codigo = req.body.codigo
        const descricao = req.body.descricao
        const dataEvento = req.body.data
        const aberto = parseInt(req.body.aberto)
        const disciplina = req.body.disciplina
        const turma = req.body.turma
        const professor = req.body.professor

            if(!codigo || !descricao || !dataEvento || !aberto)
                throw 'Campos em branco'
            
            switch(aberto){
                case 1:
                    try{

                        try{
                            const eventos = await eventoService.eventos()
                            if(verficarEvento(eventos, codigo))
                                throw 'Erro'
                        }catch(e){
                            console.log(e)
                        }
                        
                        const evento = eventoService.addEvento(codigo, descricao, dataEvento, aberto, disciplina, turma,professor)
                        if(evento.affectedRows == 0)
                            throw 'Erro ao adicionar Evento'
                        json.result = 'Evento cadastrado'
                    }catch(e){
                        json.erro = e
                        console.log(e)
                    }
                    break
                case 0:
                    try{
                        if(!turma || (!professor && !disciplina))
                            throw 'Campos em branco'

                        const evento = await addEvento(codigo, descricao, dataEvento, aberto, disciplina, turma, professor)
                        if(evento.affectedRows == 0)
                            throw 'Erro ao adicionar evento'
                        json.result = 'Evento cadastrado'
                    }catch(e){
                        json.erro = e.message
                        console.log(e)
                    }
                    
            }

        res.json(json)
    }
}