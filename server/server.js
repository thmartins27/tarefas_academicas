//modulos
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

//config
const port = 5000;
const router = require('./router')
    //express
    const server = express()
    //cors
    server.use(cors())
    //bodyparse
    server.use(bodyParser.urlencoded({extended: true}))
    server.use(bodyParser.json())


server.use('/api', router)


server.listen(port, () => {
    console.log(`Server Run... \nhttp://localhost:${port}`)
})
