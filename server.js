const express = require("express")
const cors = require("cors")
const app = express()

const db = require('./config/db.js')
const user = require('./routes/user.js')
const location = require('./routes/location.js')
const login = require('./routes/login.js')
const register = require('./routes/register.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use('/api/user',user)
app.use('/api/location',location)
app.use('/api/login',login)
app.use('/api/register',register)

app.listen(5000,() => {
    console.log('Server is listening on port 5000....')
})

