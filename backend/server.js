import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import User from './models/userModel.js'
import cors from 'cors';

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World')
})

// Get all users
app.get('/v1/api/users', async (req, res) => {
    const allUsers = await User.find()

    res.json(allUsers)
})

// Create a user
app.post('/v1/api/users', async (req, res) => {
    try {
        const { name, email, password, isMentor } = req.body

        const userExist = await User.findOne({ email })
        if (userExist) {
            res.status(400)
            throw new Error('User already exist!')
        }

        const user = await User.create({ name, email, password, isMentor })
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isMentor: user.isMentor,
                token: null
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    } catch (error) {
        res.status(500)
        throw new Error('Internal server error')
    }


})

const port = process.env.PORT || 5000
app.listen(port, console.log(`Server listening at http://localhost:${port}`))