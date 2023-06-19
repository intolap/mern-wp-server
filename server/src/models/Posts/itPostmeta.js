const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const postMetaSchema = new mongoose.Schema({
    postId:{
        type: ObjectId,
        ref: 'ItPosts',
    },
    label:{
        type: String,
        require: true
    },
    value:{
        type: String,
        require: true
    },
},{timestamps: true, versionkey: false})


module.exports = mongoose.model('ItPostmeta', postMetaSchema);