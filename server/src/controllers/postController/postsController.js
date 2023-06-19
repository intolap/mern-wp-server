const postModel = require("../../models/Users/user");
const postMetaModel = require("../../models/Users/itUsermeta");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
require('dotenv').config();
