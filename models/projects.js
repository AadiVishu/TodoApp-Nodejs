//code init:
const mongoose = require('mongoose');
const projectsSchema = mongoose.Schema({
    projectTitle: {
        type:String,
        required:true,
    },
    projectContent: {
        type:String,
        required:true,
    },
    createOn: {
        type:Date,
        default:Date.now()
    }
});


mongoose.model('projects',projectsSchema);
module.exports = mongoose.model('projects');