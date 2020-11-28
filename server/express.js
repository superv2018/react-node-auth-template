const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const CURRENT_WORKING_DIR = process.cwd()
//comment out before production
const devBundle = require('./devBundle')
const template = require('./../template')
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')

const app = express()

//comment out before production
devBundle.compile(app)

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('/', userRoutes)
app.use('/', authRoutes)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error": err.name + ": " + err.message})
    }
})

app.get('/', (req, res) => {
    res.status(200).send(template())
})

module.exports = app 



