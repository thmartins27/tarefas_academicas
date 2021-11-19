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
                    professor: grade[i].professor
                })
            }
        }catch(e){
            json.erro = `Erro na query: ${e}`
            console.log(json.erro)
        }
        res.json(json)
    }
}