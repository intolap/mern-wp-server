const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const jwt = require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require('bcryptjs');
var fs = require('fs');
const Path = require('path')

//Authorization of user.

const config = async (req, res, next) => {
    try {
        let { SiteTitle, dbUrl, role, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password.trim(), 10)

        let user = {
            SiteTitle: SiteTitle,
            dbUrl: dbUrl,
            role: role,
            email: email.trim(),
            password: hashedPassword
        }

        var dictstring = JSON.stringify(user);

        fs.writeFile(Path.join(__dirname, "../config", "config.json"), dictstring, async (err, result) => {
            if (err) return res.status(400).send({ status: false, message: err });
            next()
        })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports = {config}