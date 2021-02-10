const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type: String
    },
    
    password: {
        type: String
    },

    email: {
        type: String
    },

    isAdmin: {
        type:Boolean,
        default:true
    }
});

module.exports = { Admin :mongoose.model('admin', adminSchema)}