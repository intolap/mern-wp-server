const adminModel = require("../../models/Users/user");
const adminMetaModel = require("../../models/Users/itUsermeta");
const adminOptionsModel = require("../../models/Users/itOptions");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
var fs = require("fs");
const Path = require("path");
const {
  isValideUpdate,
  isValideMeta,
  isValideUser,
} = require("../../dataValidations/dataValidation");
const {
  isValidName,
  isValidEmail,
  isValidRole,
} = require("../../dataValidations/inputDataValidation");
//emmiter
const eventEmitter = require("../../eventEmitter/eventEmitter");

// METHOD : CREATE

/*For User*/
const createUser = async (req, res) => {
  try {
    // using destructuring of body data.
    let { SiteTitle, dbUrl, role, email, password } = req.body;

    /* User Validation */
    let message = isValideUser(req.body);
    if (message) {
      return res.status(400).send({ status: false, message: message });
    }

    /* Checking Email is exixt or not */
    let userData = await adminModel.findOne({ email: email });
    if (userData) {
      return res
        .status(400)
        .send({ status: false, message: `email: ${email} already exist.` });
    }
    /*only for SAdmin */
    if (role === "SAdmin") {

      const checkSAdmin = await adminModel.findOne({ role:'SAdmin'});
      if (checkSAdmin) {
        return res
        .status(400)
        .send({ status: false, message: `role: ${role} already exist.` });
      }

      let dataPath = Path.join(__dirname, "../../config", "config.json");

      if (!fs.existsSync(dataPath)) {
        fs.writeFile(dataPath, JSON.stringify(user), (err) => {
          // Checking for errors
          if (err)
            return res.status(404).send({
              status: false,
              message: err,
            });
          console.log("Done writing"); // Success
        });
      }
    }
    /* for all */
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    let user = {
      SiteTitle: SiteTitle,
      dbUrl: dbUrl,
      role: role,
      email: email.trim(),
      password: hashedPassword,
    };
    //emmit before creating new user
    eventEmitter.emit("BeforeCreateNewUser", user);

    let userRes = await adminModel.create(user);
    await userRes.save();

    //emmit after creating new user
    eventEmitter.emit("AfterCreateNewUser", userRes);

    return res.status(201).send({
      status: true,
      message: "new User registered successfully",
      data: userRes,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// METHOD : LOGIN
//admin
const loginAdmin = async (req, res) => {
  try {
    // using destructuring of body data.
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//user
const loginUser = async (req, res) => {
  try {
    // using destructuring of body data.
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// METHOD : GET
const getUser = async (req, res) => {
  try {
    //emmit before getting all the users
    eventEmitter.emit("BeforeGettingAllUsers")

    let data = await adminModel.find({});
    //emmit after getting all the users
    eventEmitter.emit("AfterGettingAllUsers",data);
    return res
      .status(200)
      .send({ status: true, message: " User get successfully", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// METHOD : UPDATE

const updateUser = async (req, res) => {
  try {
    const { id, SiteTitle, dbUrl, role, email, password } = req.body;

    /* validation check for updated data */
    const validInput = isValideUpdate(req.body);
    if (!validInput) {
      res
        .status(400)
        .send({ status: false, message: "It is not a valid update" });
    }

    /* checking user is valid or not */
    const existingData = await adminModel.findById({ _id: id });
    if (!existingData) {
      res.status(404).send({ status: false, message: "No Such User Exist" });
    }

    let updateData = {};
    if (SiteTitle) updateData.SiteTitle = SiteTitle;
    if (dbUrl) updateData.dbUrl = dbUrl;
    if (role) updateData.role = role;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    //emmit before updating user
    eventEmitter.emit("BeforeUpdateUser", updateData);

    const updateUser = await adminModel.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );
    //emmit after updating user
    eventEmitter.emit("AfterUpdateUser", updateUser);

    return res
      .status(200)
      .send({ status: true, message: "updated sucessfully", data: updateUser });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// METHOD : DELETE

const deleteUser = async (req, res) => {
  try {
    // const { id } = req.body;
    const  id  = req.header('id');
    /* checking user is valid or not */
    const existingData = await adminModel.findById({ _id: id });
    if (!existingData) {
      res.status(404).send({ status: false, message: "No Such User Exist" });
    } else {
      const isSAdmin = await adminModel.findOne({ _id: id, role: "SAdmin" });
      if (isSAdmin) {
        return res
          .status(404)
          .send({ status: false, message: "Super Admin Can't Be Deleted" });
      }
      
      //emmit before deleting user
      eventEmitter.emit("BeforeDeleteUser", id);

      /* deleting user */
      const deleteUser = await adminModel.findOneAndDelete({ _id: id });

      //emmit after deleting user
      eventEmitter.emit("AfterDeleteUser", deleteUser);

      return res.status(200).send({
        status: "true",
        message: "user data dleted sucessfully",
        deletedData: deleteUser,
      });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// METHOD : FORGOT PASSWORD

const forgotPassword = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const passwordReset = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const redirectUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  loginAdmin,
  getUser,
  updateUser,
  deleteUser,
  forgotPassword,
  passwordReset,
  redirectUser,
};
