//code init:
const mongoose = require("mongoose");
const quotesSchema = mongoose.Schema({
    quoteTitle: {
        type:String,
        required:true
    },
    quoteSignature: {
        type:String,
        required:true
    },
    quoteContent: {
        type:String,
        required:true
    },
    dd: {
         type: Number,
        default: (new Date()).getDate()
    },
    mm: {
        type:Number,
        default: (new Date()).getMonth()
    },
    yy: {
        type:Number,
        default:(new Date()).getFullYear()
    },
    HHs: {
        type:Number,
        default: (new Date()).getHours()
    },
    MMs: {
        type:Number,
        default: (new Date()).getMinutes()
    },
    SS: {
        type:Number,
        default: (new Date()).getSeconds()
    },

});

mongoose.model('quotes',quotesSchema);
module.exports = mongoose.model('quotes');