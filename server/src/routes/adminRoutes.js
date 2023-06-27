const express = require('express');
const router = express.Router();

const { createUser,getUser } = require('../controllers/userController/adminController')
const { config } = require('../middlewares/config')


//------------------------------------------> (This is test api ) <--------------------------------------------//

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


//===================================================( All team api)======================================================///


//Person route

//-------------------------> (When person creat, call this api) <----------------------------------//

router.post("/person/create", createUser)




module.exports = router;