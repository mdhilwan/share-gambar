const express = require('express')
const app = express()
const cors = require('cors')
const compression = require('compression')
require('dotenv').config({ path: `.env` })
const https = require('https')
const fs = require('fs')
const routes = require('./routes')
const path = require('path')

const server = https.createServer(
  {
    key: fs.readFileSync(process.env.WEBSOCKET_KEY),
    cert: fs.readFileSync(process.env.WEBSOCKET_CERT),
  },
  app
)

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', routes())

server.listen(4001, () => console.log('API started!:4001'))
