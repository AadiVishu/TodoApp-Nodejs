//code init:
const mongoose = require('mongoose');
const signupSchema = mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email :  {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    createOn : {
        type:Date,
        default:Date.now()
    }
});

//creating signup model:
mongoose.model('signup_users',signupSchema);
//expoting:
module.exports = mongoose.model('signup_users'); //'signup' is collection name: