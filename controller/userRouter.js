const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/userModel')

userRouter.get('/', async (request, response) => {
    //populate (blogs is on the id of the user in the json) accordance to the 'ref' in the schema of user model
    const results = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(results)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (username.length < 4 && password.length < 4) {
        return response.status(400).send({ error: 'length of username or password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })
    console.log(user, 'user about to be saved in routereeeeeeeeee')

    const savedUser = await user.save()

    response.status(201).json(savedUser)



})

module.exports = userRouter