const adminModel = require("../../models/Users/user");
const adminMetaModel = require("../../models/Users/itUsermeta");
const adminOptionsModel = require("../../models/Users/itOptions");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
require('dotenv').config();
var fs = require('fs');
const Path = require('path')
const { isValideAdmin } = require('../../dataValidations/dataValidation')


// METHOD : CREATE


const createUser = async (req, res) => {
    try {
        // using destructuring of body data.
        let { SiteTitle, dbUrl, role, email, password } = req.body;


        let message = isValideAdmin(req.body)
        if (message) {
            return res.status(400).send({ status: false, message: message });

        }

        if (fs.existsSync(Path.join(__dirname, "../../config", "config.json"))) {
            let userData = await adminModel.findOne({ email: email })
            if (userData) {
                return res.status(400).send({ status: false, message: `email: ${email} already exist.` })
            }
        }

        const hashedPassword = await bcrypt.hash(password.trim(), 10)

        let user = {
            SiteTitle: SiteTitle,
            dbUrl: dbUrl,
            role: role,
            email: email.trim(),
            password: hashedPassword
        }

        if (fs.existsSync(Path.join(__dirname, "../../config", "config.json"))) {
            let userRes = await adminModel.create(user)
            return res.status(201).send({ status: true, message: "new User registered successfully", data: userRes });
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// METHOD : LOGIN


//admin

const loginAdmin = async (req, res) => {
    try {

        // using destructuring of body data.



    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



//user


const loginUser = async (req, res) => {
    try {
        // using destructuring of body data.


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



// METHOD : GET

const getUser = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



// METHOD : UPDATE

const updateUser = async (req, res) => {
    try {
        // using destructuring of body data.


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


// METHOD : DELETE

const deleteUser = async (req, res) => {
    try {
        // using destructuring of body data.


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



// METHOD : FORGOT PASSWORD

const forgotPassword = async (req, res) => {
    try {


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





const passwordReset = async (req, res) => {
    try {



    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



const redirectUser = async (req, res) => {
    try {


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { createUser, loginUser, loginAdmin, getUser, updateUser, deleteUser, forgotPassword, passwordReset, redirectUser }