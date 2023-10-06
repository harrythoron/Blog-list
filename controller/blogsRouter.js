const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post('/', (request, response) => {
    const body = request.body
    if (body.likes === undefined) {
        body.likes = 0
    }
    const blog = new Blog(request.body)



    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogRouter