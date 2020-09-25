//code init:
const url = "mongodb://localhost:27017/todo_app";
const mongoose = require('mongoose');

//connection setip:
mongoose.connect(url,
    {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
   },
   function(err,doc) {
       if(err) throw err;
       console.log("congrats! database connected successfully!");
   }
);