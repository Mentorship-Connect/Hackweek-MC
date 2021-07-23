import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
const router = express.Router()

// Get all users
router.get('/v1/api/users', asyncHandler(async (req, res) => {
    const allUsers = await User.find()
    res.json(allUsers)
}))

// Create a user
router.post('/v1/api/users', asyncHandler(async (req, res) => {

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
}))

// Login user
router.post('/v1/api/users/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isMentor: user.isMentor,
            token: null,
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
}))

export default router