const express = require('express')
const router = express.Router()

//controllers
const professorController = require('./src/controllers/professorController')
const alunoController = require('./src/controllers/alunoController')
const turmaController = require('./src/controllers/turmaController')
const disciplinaController = require('./src/controllers/disiciplinaController')
const gradeController = require('./src/controllers/gradeController')
const provaController = require('./src/controllers/provaController')

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
//grade-turma
router.get('/grade/:idTurma', gradeController.buscarUm)
router.post('/grade', gradeController.addGrade)
router.put('/grade/:idTurma/:dia', gradeController.alterDisciplina)
router.delete('/grade/:idTurma/:dia?', gradeController.delete)

//CRUD Aluno
router.get('/alunos', alunoController.buscarTodos)
router.get('/aluno/:matricula', alunoController.buscarUm)
router.post('/aluno', alunoController.addAluno)
router.put('/aluno/:matricula', alunoController.delete)

//CRUD disciplina
router.get('/disciplinas', disciplinaController.buscarTodos)
router.get('/disciplina/:id', disciplinaController.buscarUm)
router.post('/disciplina', disciplinaController.addDisciplina)
router.put('/disciplina/:id', disciplinaController.alterDisciplina)
router.delete('/disciplina/:id', disciplinaController.delete)

//Provas
router.get('/prova/:idTurma', provaController.buscarUm)

module.exports = router