import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import User from './models/userModel.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/v1/api/users', async (req, res) => {
    const allUsers = await User.find()

    res.json(allUsers)
})

const port = process.env.PORT || 5000
app.listen(port, console.log(`Server listening at http://localhost:${port}`))