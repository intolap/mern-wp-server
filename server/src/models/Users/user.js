const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
    SiteTitle:{
        type: String,
        required: true
    },
    dbUrl:{
        type: String,
        default: null,
    },
    role:{
        type: String,
        enum: ['SAdmin','Admin','User'],
        default: 'User'
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },

},{timestamps: true, versionkey: false})


module.exports = mongoose.model('ItUsers', userSchema);
