const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const getToken = (request, response, next) => {

    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
        console.log(request.token, 'tokennnnnn')
    }


    next()
}

const userExtractor = async (request, response, next) => {
    if (request.token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        console.log(decodedToken, 'decodedToken in middleware.js')
        const user = await User.findById(decodedToken.id)
        request.user = user
    }

    next()
}
const errorHandler = (error, request, response, next) => {


    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
    }

    next(error)
}

module.exports = {
    errorHandler,
    getToken,
    userExtractor
}