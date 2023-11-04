const cors = require('cors')
require('dotenv').config()
const express = require('express')
require('express-async-errors');
const router = require('./router/router')
const errorMiddleware = require('./middlewares/error')
const server = express()
server.use(cors())
server.use(express.json())
const path = require('path');
const fs = require('fs');
server.use(router)
server.use(errorMiddleware)
router.get('/:filename', (req, res) => {
    const { filename } = req.params;
    const directoryPath = path.join(__dirname, '..','resumes');
    console.log(__dirname);
    const filePath = path.join(directoryPath, filename);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      console.error(`File not found: ${filePath}`);
      res.status(404).send('File not found');
    }
  });

require('./database/connection')
const port = 5004 || process.env.PORT
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})