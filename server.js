const express = require('express')
const connectDB = require('./config/connectDB')
const contactRouter = require('./routes/contact')
const app = express()
const port = 5000

connectDB()
app.use(express.json())
app.use('/api/contact',contactRouter)



app.listen(port, console.log(`server is running on ${port}`))