import express from 'express'
import asyncHandler from 'express-async-handler'
import { admin, protect } from '../middleware/authMiddleware.js'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const router = express.Router()

// Get all users
router.get('/v1/api/users', asyncHandler(async (req, res) => {
    const allUsers = await User.find()
    res.json(allUsers)
}))

// Create a user
router.post('/v1/api/users', asyncHandler(async (req, res) => {

    const { name, email, password, isMentor, title} = req.body

    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exist!')
    }

    const user = await User.create({ name, email, password, isMentor, title })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isMentor: user.isMentor,
            title: user.title,

            token: generateToken(user._id)
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
    const match = await user.matchPassword(password)
    if (user && match) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isMentor: user.isMentor,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
}))

// Get user profile
router.get('/v1/api/users/profile', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isMentor: user.isMentor,
            avatar: user.avatar,
            title: user.title,
            program: user.program,
            interests: user.interests,
            bio: user.bio,
            availability: user.availability
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
}))

// Get user by ID
router.get('/v1/api/users/:id', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      throw new Error('User not found')
    }
}))

// Update user profile
router.put('/v1/api/users/profile', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.avatar = req.body.avatar || user.avatar
        user.title = req.body.title || user.title
        user.program = req.body.program || user.program
        user.interests = req.body.interests || user.interests
        user.bio = req.body.bio || user.bio
        user.availability = req.body.availability || user.availability
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isMentor: updatedUser.isMentor,
            avatar: updatedUser.avatar,
            title: updatedUser.title,
            program: updatedUser.program,
            interests: updatedUser.interests,
            bio: updatedUser.bio,
            availability: updatedUser.availability
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
}))

// Update user by ID - Admin only
router.put('/v1/api/users/:id', protect, admin, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.avatar = req.body.avatar || user.avatar
        user.title = req.body.title || user.title
        user.program = req.body.program || user.program
        user.interests = req.body.interests || user.interests
        user.bio = req.body.bio || user.bio
        user.availability = req.body.availability || user.availability
        user.isAdmin = req.body.isAdmin
        
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isMentor: updatedUser.isMentor,
            avatar: updatedUser.avatar,
            title: updatedUser.title,
            program: updatedUser.program,
            interests: updatedUser.interests,
            bio: updatedUser.bio,
            availability: updatedUser.availability,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
}))

// Delete user by ID - Admin only
router.delete('/v1/api/users/:id', protect, admin, asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
}))

export default router