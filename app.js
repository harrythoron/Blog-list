const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controller/blogsRouter')
const morgan = require('morgan')
const userRouter = require('./controller/userRouter')
const loginRouter = require('./controller/login')
const middleware = require('./utils/middleware')



console.log('connecting to', config.urlBlog);
mongoose.connect(config.urlBlog).then(res => console.log('connected to mongodb'))
app.use(middleware.getToken)
app.use(middleware.userExtractor)
app.use(cors())
app.use(express.json())



morgan.token('cont', function (req, res) {

    return `${JSON.stringify(req.body)}`
})
app.use(morgan(':method :url :status :res[content-length] -ab :response-time ms :cont'))

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.get('/', (request, response) => {
    response.send('<h1>Hiya</h1>')
})




app.use(middleware.errorHandler)



module.exports = app