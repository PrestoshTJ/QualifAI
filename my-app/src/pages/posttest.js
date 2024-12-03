const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
    Username: {
        type: String,
        required:true
    },
    Password: {
        type: String, 
        required: true
    },
    Skillset: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', PostSchema)