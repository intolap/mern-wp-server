const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dbConnection = require('./db_connection/mongodb')
const AdminRoutes = require('./routes/adminRoutes')
// const TeamRoutes = require('./routes/team')
// const UserRoutes = require('./routes/user')
const cors = require('cors')
require('dotenv').config()
var fs = require('fs');
const Path = require('path')




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const path = Path.join(__dirname, "config", "config.json");
//Database connection
if (fs.existsSync(path)) {
    console.log(path)
    dbConnection()
}



// //all routes
app.use('/admin', AdminRoutes)
// app.use('/team', TeamRoutes)
// app.use('/user', UserRoutes)




app.listen(process.env.PORT || 5000, () => {
    console.log(`Express running with port...${process.env.PORT || 5000}`)
})