const adminModel = require("../../models/Users/user");
const adminMetaModel = require("../../models/Users/itUsermeta");
// const adminOptionsModel = require("../../models/Users/itOptions");
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
  isValideMetaUpdate,
  isValidMetaDelete,
} = require("../../dataValidations/dataValidation");
const {
  isValidName,
  isValidEmail,
  isValidRole,
  isValidObjectId,
} = require("../../dataValidations/inputDataValidation");

//emmiter
const eventEmitter = require("../../eventEmitter/eventEmitter");

// METHOD : CREATE
const createUserMeta = async (req, res) => {
  try {
    let { userId, userMetaKey, userMetaValue } = req.body;
    let message = isValideMeta(req.body);
    if (message) {
      return res.status(400).send({ status: false, message: message });
    }
    /* checking any data present wrt given (user and metaKey ) */
    const existingData = await adminMetaModel.findOne({
      userId: userId,
      userMetaKey: userMetaKey,
    });

    /* Create Only if it is not a pre-existing MetaKey */
    if (existingData) {
      let metaData = await adminMetaModel.findOneAndUpdate(
        { userId: userId, userMetaKey: userMetaKey },
        { userMetaValue: userMetaValue },
        { new: true }
      );

      return res.status(200).send({
        status: true,
        message: "UserMeta updated successfully",
        data: metaData,
      });
    }

    //Emmit before create a userMeta
    eventEmitter.emit("BeforeCreateUserMeta", {
      userId,
      userMetaKey,
      userMetaValue,
    });

    const NewMetaData = await adminMetaModel.create({
      userId,
      userMetaKey,
      userMetaValue,
    });
    NewMetaData.save();

    //Emmit after create a userMeta
    eventEmitter.emit("AfterCreateUserMeta", NewMetaData);

    return res.status(201).send({
      status: true,
      message: "new UserMeta registered successfully",
      data: NewMetaData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//GET All MetaData
const getUserMeta = async (req, res) => {
  try {
    //Emmit before getting all userMetas
    eventEmitter.emit("BeforeGettingAllUserMeta");

    let metaData = await adminMetaModel.find().populate("userId");
    // console.log(metaData);

    //Emmit before getting all userMetas
    eventEmitter.emit("AfterGettingAllUserMeta", metaData);

    return res.status(200).send({
      status: true,
      message: "UserMeta retrieved successfully",
      data: metaData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//UPDATE MetaDATA
const updateUserMeta = async (req, res) => {
  try {
    const { userId, userMetaKey, userMetaValue } = req.body;

    /* validation check for updated data */
    const validInput = isValideMetaUpdate(req.body);
    if (validInput) {
      return res
        .status(400)
        .send({ status: false, message: "It is not a valid meta update" });
    }

    /* checking any data present wrt given (user and metaKey ) */
    const existingData = await adminMetaModel.findOne({
      userId: userId,
      userMetaKey: userMetaKey,
    });
    if (!existingData) {
      const NewMetaData = await adminMetaModel.create({
        userId,
        userMetaKey,
        userMetaValue,
      });
      NewMetaData.save();
      return res.status(201).send({
        status: true,
        message: "new UserMeta registered successfully",
        data: NewMetaData,
      });
    }
    //emmet before updating
    eventEmitter.emit("BeforeUpdateUserMeta", {
      userId,
      userMetaKey,
      userMetaValue,
    });

    let metaData = await adminMetaModel.findOneAndUpdate(
      { userId: userId, userMetaKey: userMetaKey },
      { userMetaValue: userMetaValue },
      { new: true }
    );

    //emmet after updating
    eventEmitter.emit("AfterUpdateUserMeta", metaData);

    return res.status(200).send({
      status: true,
      message: "UserMeta updated successfully",
      data: metaData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//DELETE SINGLE MetaData
const deleteUserMeta = async (req, res) => {
  try {
    // const { userId, userMetaKey } = req.body;
    const userId = req.header("userId");
    const userMetaKey = req.header("userMetaKey");
    const data = { userId, userMetaKey };
    /* checking for id validation */
    const delValidationMsg = isValidMetaDelete(data);
    if (delValidationMsg) {
      return res.status(400).send({ status: false, message: delValidationMsg });
    }

    let deletedMetaData;
    /* checking user with is valid or not */
    if (userId && userMetaKey) {
      const existingData = await adminMetaModel.findOne({
        userId: userId,
        userMetaKey: userMetaKey,
      });
      console.log("existing data with uid and uMetakey", existingData);

      if (!existingData) {
        return res
          .status(404)
          .send({ status: false, message: "No Such User With Key Exist" });
      }
      //emmet before deleting meta data
      eventEmitter.emit("BeforeDeleteUserMeta", {
        userId,
        userMetaKey,
      });

      deletedMetaData = await adminMetaModel.findOneAndDelete({
        userId: userId,
        userMetaKey: userMetaKey,
      });
    } else if (userId) {
      const existingData = await adminMetaModel.findOne({
        userId: userId,
      });
      // console.log("existing data with uid", existingData);
      if (!existingData) {
        res.status(404).send({ status: false, message: "No Such User Exist" });
      }
      //emmet before deleting meta data
      eventEmitter.emit("BeforeDeleteUserMeta", {
        userId
      });

      deletedMetaData = await adminMetaModel.findOneAndDelete({
        userId: userId,
      });
    }

    //emmet after deleting meta data
    eventEmitter.emit("AfterDeleteUserMeta", deletedMetaData);

    return res.status(200).send({
      status: true,
      message: "UserMeta deleted successfully",
      data: deletedMetaData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createUserMeta,
  getUserMeta,
  deleteUserMeta,
  updateUserMeta,
};
