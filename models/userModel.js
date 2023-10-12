const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})
userScheme.plugin(uniqueValidator)
userScheme.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
        //passwordHash should not be revealed
        delete returnedObj.passwordHash
    }
})

const User = mongoose.model('User', userScheme)

module.exports = User