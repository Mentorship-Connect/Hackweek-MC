import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

const port = process.env.PORT || 5000
app.listen(port, console.log(`Server listening at http://localhost:${port}`))