const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const postSchema = new mongoose.Schema({
    postAuthor: {
        type: ObjectId,
        ref: 'ItUsers',
    },
    postDate: {
        type: Date,
        require: true
    },
    postDateGmt: {
        type: Date,
        require: true
    },
    postContent: {
        type: String,
        require: true
    },
    postTitle: {
        type: String,
        require: true
    },
    postExcerpt: {
        type: String,
        require: true
    },
    postStatus: {
        type: String,
        require: true
    },
    commentStatus: {
        type: String,
        require: true
    },
    pingStatus: {
        type: String,
        require: true
    },
    postPassword: {
        type: String,
        require: true
    },
    postName: {
        type: String,
        require: true
    },
    toPing: {
        type: String,
        require: true
    },
    pinged: {
        type: String,
        require: true
    },
    postModified: {
        type: Date,
        require: true
    },
    postModifiedGmt: {
        type: Date,
        require: true
    },
    postPontentFiltered: {
        type: String,
        require: true
    },
    postParent: {
        type: String,
        require: true
    },
    guid: {
        type: String,
        require: true
    },
    menuOrder: {
        type: Number,
        require: true
    },
    postType: {
        type: String,
        require: true
    },
    postMimeType: {
        type: String,
        require: true
    },
    commentCount: {
        type: String,
        require: true
    }
}, { timestamps: true, versionkey: false })


module.exports = mongoose.model('ItPosts', postSchema);