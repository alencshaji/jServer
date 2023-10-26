const cors = require('cors')
require('dotenv').config()
const express = require('express')
require('express-async-errors');
const router = require('./router/router')
const errorMiddleware = require('./middlewares/error')
const server = express()
server.use(cors())
server.use(express.json())
server.use(router)
server.use(errorMiddleware)
require('./database/connection')
const port = 5004 || process.env.PORT
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})