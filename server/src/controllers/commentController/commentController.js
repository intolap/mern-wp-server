const adminModel = require("../../models/Users/user");
const adminMetaModel = require("../../models/Users/itUsermeta");
const CommentModel = require("../../models/comments/comments");
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
require("dotenv").config();
// var fs = require("fs");
// const Path = require("path");

/* event emmiter */
const eventEmitter = require("../../eventEmitter/eventEmitter");
const UAParser = require("ua-parser-js");
const requestIp = require("request-ip");

const {
  isValideUpdate,
  isValideMeta,
  isValideMetaUpdate,
  isValidMetaDelete,
  isValidComment,
  isValidCommentUpdate,
} = require("../../dataValidations/dataValidation");
const {
  isValidName,
  isValidEmail,
  isValidRole,
  isValidObjectId,
} = require("../../dataValidations/inputDataValidation");

const AddComment = async (req, res) => {
  try {
    const {
      post_ID,
      comment_author_name,
      comment_author_email,
      comment_content,
      comment_approved,
      comment_type,
      comment_id,
      token,
      comment_date,
      comment_date_gmt,
    } = req.body;
    /* input validation */
    const message = isValidComment(req.body);
    if (message) {
      return res.status(400).json({ message: message });
    }
    let data = { ...req.body };

    // Emit the 'BeforeCommentSave' event
    eventEmitter.emit("BeforeCommentSave", data);

    /* For comment_Agent */
    const userAgent = req.headers["user-agent"];
    const parser = new UAParser();
    const result = parser.setUA(userAgent).getResult();
    // console.log("result", result);
    const device = `${result.os.name} ${result.os.version}` || "Unknown";
    const browser = result.browser.name || "Unknown";

    const comment_agent = {
      browser: browser,
      device: device,
    };
    data.comment_agent = comment_agent;

    /* Selecting Comment Parent */
    if (comment_id) {
      //comment id valid or not valid
      const comment_parent = await CommentModel.findOne({ _id: comment_id });
      if (!comment_parent) {
        return res.status(400).json({ message: "Comment Parent not found" });
      }
      //find if post or any comment present or not wrt to id
      data.comment_parent = comment_id;
    }

    /** ip adress ????????? */
    // const clientIp = requestIp.getClientIp(req);
    // console.log('IP Address:', clientIp);

    // const ip =
    //   req.headers["cf-connecting-ip"] ||
    //   req.headers["x-real-ip"] ||
    //   req.headers["x-forwarded-for"] ||
    //   req.socket.remoteAddress ||
    //   "";
    // console.log(ip);

    let ipAddress = req.ip;
    if (ipAddress === "::1") {
      ipAddress = "::127.0.0.1";
    }
    data.comment_author_IP = ipAddress;

    /* if have token(for logged in user only) */
    if (token) {
      //   // console.log("token", token);
      //   // const isVerify = await jwt.verify(token, process.env.JWT_SECRET);
      //   // console.log("isVerify", isVerify);
      //   // if(isVerify){
      //   //   let userData = await adminModel.findOne({ _id: VerifyUser._id });
      //   /* Adding all details after fetching from db */
      //   // data.user_id = VerifyUser._id
      //   // data.comment_author_name = userData.
      //   // data.comment_author_email = userData.email;
      //   /*For comment_author_name */
      //   //find in userMeta wrt user_id and meta key(f_name)
      //   // }
    } else {
      //has account but not logged in [*not a guest]
      if (comment_author_email) {
        const userData = await adminModel.findOne({
          email: comment_author_email,
        });
        if (userData) {
          data.comment_author_email = userData.email;
          data.user_id = userData._id.toString();
          // Find in userMetaData wrt user_id and meta key(f_name)
          const userMetaData = await adminMetaModel.findOne({
            userId: data.user_id,
            userMetaKey: "f_name",
          });

          if (userMetaData) {
            data.comment_author_name = userMetaData.userMetaValue;
          }
          data.comment_author_email = comment_author_email;
        }
        data.comment_author_email = comment_author_email;
      }
    }

    const addedComment = await CommentModel.create(data);
    addedComment.save();

    // Emit the 'AfterCommentSave' event
    eventEmitter.emit("AfterCommentSave", addedComment);

    return res.status(200).send({ status: true, data: addedComment });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const Allcomments = async (req, res) => {
  try {
    // Emit the 'Before getting Data' event
    eventEmitter.emit("BeforeGettingAllComments");

    const data = await CommentModel.find();

    // Emit the 'Before getting Data' event
    eventEmitter.emit("AfterGettingAllComments");

    return res.status(200).send({ status: true, data: data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const GetSingleComment = async (req, res) => {
  try {
    const comment_id = req.header("comment_id");
    const message = isValidObjectId(comment_id);
    if (message) {
      return res.status(400).json({ message: message });
    }
    // Emit the 'Before getting specific Comment' event
    eventEmitter.emit("BeforeGettingSpecificComment", comment_id);

    const validComment = await CommentModel.findOne({ _id: comment_id });
    if (!validComment) {
      return res.status(400).json({ message: "Comment not found" });
    }

    // Emit the 'After getting specific Comment' event
    eventEmitter.emit("AfterGettingSpecificComment", validComment);
    return res.status(200).send({ status: true, data: validComment });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const UpdateComment = async (req, res) => {
  try {
    const { comment_id, comment_content } = req.body;
    const message = isValidCommentUpdate(req.body);
    if (message) {
      return res.status(400).json({ message: message });
    }

    const validComment = await CommentModel.findOne({ _id: comment_id });
    if (!validComment) {
      return res.status(400).json({ message: "Comment not found" });
    }
    //emit before updating
    eventEmitter.emit("BeforeUpdatingComment", validComment);

    const UpdateComment = await CommentModel.findOneAndUpdate(
      { _id: comment_id },
      { comment_content: comment_content },
      { new: true }
    );
    //emit after updating
    eventEmitter.emit("AfterUpdatingComment", UpdateComment);
    return res.status(200).send({ status: true, data: UpdateComment });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const DeleteSingleComment = async (req, res) => {
  try {
    const comment_id = req.header("comment_id");
    const message = isValidObjectId(comment_id);
    if (message) {
      return res.status(400).json({ message: message });
    }

    const validComment = await CommentModel.findOne({ _id: comment_id });
    if (!validComment) {
      return res.status(400).json({ message: "Comment not found" });
    }
    //emit before deleting
    eventEmitter.emit("BeforeDeletingComment", validComment);

    const deletedComment = await CommentModel.deleteOne({ _id: comment_id });

    //emit after deleting
    eventEmitter.emit("AfterDeletingComment", deletedComment);

    return res.status(200).send({ status: true, data: "sucessfully deleted" });

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  AddComment,
  Allcomments,
  DeleteSingleComment,
  GetSingleComment,
  UpdateComment,
};
