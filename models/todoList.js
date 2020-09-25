//code init:
const mongoose = require("mongoose");
const todoListSchema = mongoose.Schema({
    todoTask: {
        type:String,
        required:true,
    },
    createOn: {
        type:Date,
        default:Date.now()
    }
});

mongoose.model('todoLists',todoListSchema);
module.exports = mongoose.model('todoLists');