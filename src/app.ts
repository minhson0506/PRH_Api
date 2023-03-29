require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import api from './api'
import {errorHandler, notFound} from './middlewares'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())

app.use(cors({
    origin: '*', // allow to server to accept request from different origin
}))

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control_Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    // pass to next layer of middleware
    next();
})

app.get('/', (req, res) => {
    res.json({
        message: 'Api for getting data from PRH'
    })
})

app.use('/', api)

app.use(notFound)
app.use(errorHandler)

export default app