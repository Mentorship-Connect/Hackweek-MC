import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = AsyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
        token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id).select('-password')

        next()
        } catch (error) {
        console.error(error)
        res.status(404)
        throw new Error('Not authorized, token failed!')
        }
    }

    if (!token) {
        res.status(402)
        throw new Error('Not authorized, no token')
    }
    })

    const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(403)
        throw new Error('Not authorized as an admin')
    }
}

export { protect, admin }