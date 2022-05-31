import express from "express"
import mongodb from 'mongodb'
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

import config from './db.js'
import router from "./router/index.js"
import errorMiddleware from "./middlewares/error-middleware.js"

const app = express()
const PORT = process.env.SERVER_PORT ?? 8666
const client = mongodb.MongoClient

client.connect(config.DB, (err, db) => {
    if (err) {
        console.log('database is not connected')
    } else {
        console.log('connected!')
    }
})

app.use(express.json())
app.use(cookieParser())
app.use(router)

app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(config.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    
        app.listen(PORT, () => {
            console.log(`server is started on http://localhost:${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()