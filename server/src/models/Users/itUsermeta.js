const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const usermetaSchema = new mongoose.Schema({
    userId:{
        type: ObjectId,
        ref: 'ItUsers',
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


module.exports = mongoose.model('ItUsermeta', usermetaSchema);
