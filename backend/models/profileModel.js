const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    title: {
        type: String,
    },
    program: {
        type: String,
    },
    interest: [{
        type: String,
        required: true
    }],
    bio: {
        type: String,
    }, 
    availability: {
        type: String
    }
}, {
    timestamp: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export default Profile