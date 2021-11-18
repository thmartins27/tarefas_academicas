const express = require('express')
const router = express.Router()

const professorController = require('./src/controllers/professorController')
const alunoController = require('./src/controllers/alunoController')
const turmaController = require('./src/controllers/turmaController')

//CRUD Professor
router.get('/professores', professorController.buscarTodos)
router.get('/professor/:codigo', professorController.buscarUm)
router.post('/professor', professorController.addProfessor)
router.put('/professor/:codigo', professorController.alterProfessor)
router.delete('/professor/:codigo', professorController.delete)

//CRUD Turma
router.get('/turmas', turmaController.buscarTodos)
router.get('/turma/:id', turmaController.buscarUm)
router.post('/turma', turmaController.addTurma)
router.put('/turma/:id', turmaController.alterTurma)
router.delete('/turma/:id', turmaController.delete)


//CRUD Aluno
router.get('/alunos', alunoController.buscarTodos)
router.get('/aluno/:matricula', alunoController.buscarUm)
router.post('/aluno', alunoController.addAluno)
router.put('/aluno/:matricula', alunoController.alterAluno)
router.delete('/aluno/:matricula', alunoController.delete)

module.exports = router