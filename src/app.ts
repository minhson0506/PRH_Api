require('dotenv').config()
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import {PRHCompany} from './interfaces/PRHCompany'
import CustomError from './classes/CustomError'

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

app.get('/', async (req, res) => {
    const url = 'http://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=20&resultsFrom=0&streetAddressPostCode=02100&companyRegistrationFrom=2014-02-28'

    await requestData<PRHCompany>(url).then((data) => {
        console.log(data)
    })

    res.json({
        message: 'Api for getting data from PRH'
    })
})

// Make the `request` function generic
// to specify the return data type:
async function requestData<TResponse>(
    url: string,
    // `RequestInit` is a type for configuring 
    // a `fetch` request. By default, an empty object.
    config: RequestInit = {}

    // This function is async, it will return a Promise:
): Promise<TResponse> {

    // Inside, we call the `fetch` function with 
    // a URL and config given:
    try {
        const response = await fetch(url, config)
        const data = await response.json()
        return data as TResponse
    } catch (error) {
        throw new CustomError("Error when getting data from PRH", 404)
    }
}

export default app