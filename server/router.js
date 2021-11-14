const express = require('express')
const router = express.Router()

const professorController = require('./src/controllers/professorController')

router.get('/professores', professorController.buscarTodos)
router.get('/professor/:codigo', professorController.buscarUm)
router.post('/professor', professorController.addProfessor)
router.put('/professor/:codigo', professorController.alterProfessor)
router.delete('/professor/:codigo', professorController.delete)
module.exports = router