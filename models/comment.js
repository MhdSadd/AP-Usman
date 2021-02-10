const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    message:{
        type: String 
    },
    short_message: {
        type: String
    },
    approved: {
        type: Boolean,
        default: false
    },
    comment_date: {
        type: String
    }
});

module.exports = {Comment: mongoose.model('comment', commentSchema)};