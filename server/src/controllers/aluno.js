const turmaController = require('../controllers/turmaController')

turmaController.buscarTodos()
    .then(contents => {
        for(i in contents){
            console.log(contents[i])
        }
    })