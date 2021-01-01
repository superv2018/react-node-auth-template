import app from './express'
import mongoose from 'mongoose'

import config from '../config/config'

import dotenv from 'dotenv'
dotenv.config()

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true })
.then(result => {
    console.log('connected to database')
})
.catch((error) => {
    console.log('error connecting to MongoBd', error.message)
})

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`)
})



app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info(`Server running on port ${config.port}`)
})