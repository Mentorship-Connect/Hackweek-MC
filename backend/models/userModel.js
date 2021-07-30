import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: false
    }, 
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isMentor: {
        type: Boolean,
        required: true,
        default: false
    },
    avatar: { type: String },
    title: { type: String },
    program: { type: String },
    interests: [{ type: String }],
    linkedin: { type: String },
    bio: { type: String }, 
    availability: { type: String },
}, {
    timestamp: true,
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model('User', userSchema)

export default User