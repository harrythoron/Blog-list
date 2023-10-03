const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controller/blogsRouter')




mongoose.connect(config.urlBlog)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

app.get('/', (request, response) => {
    response.send('<h1>Hiya</h1>')
})








module.exports = app