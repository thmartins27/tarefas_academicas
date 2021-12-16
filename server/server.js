//modulos
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
//config
const port = 5000;
const router = require('./router')
const server = express()
server.use(cors())
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use('/sa', router)
server.listen(port, '0.0.0.0', () => {
    console.log(`Server Run... \nhttp://localhost:${port}`)
})
