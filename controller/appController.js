//code init:
const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/user'); //user.js
const Todolist = require('../models/todoList'); //user.js
const Projects = require('../models/projects'); //user.js
const Quotes = require('../models/quotes'); //user.js
const { json } = require('body-parser');

// middleware setup:
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));




// ********************************** DEFAULT RENDER PAGE AS LOGIN OR SIGNUP ***************************** //
router.all('/', function (req, res) {
    return res.render('./login/index.hbs')
});

//********************************** WORKING ON USERS SIGNUP FEATURES *********************************** //
router.post('/newsignup', [
    //checking not empty fields by array:
    check('username').not().isEmpty().trim().escape(),
    check('password').not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail()
],
    function (req, res) {
        //check validation:
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({  // error code '422' is kind of error status (JUST MAKE GOOGLE):
                status: false,
                message: "form validation errors",
                errosrs: errors.array() //converting error in array formate:
            });
        };
        //hashing password code:
        const hashedPassword = bcrypt.hashSync(req.body.password, 10); //
        //craeting by the save method so creating a new user model:
        const newSignup = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        // insert adata into database:
        newSignup.save(function (err, result) {
            //check error:
            if (err) {
                return res.json({
                    status: false,
                    message: "Database inserting failed!",
                    error: err
                });
            }
            res.redirect('/')
        });
    }
);




//********************************** WORKING ON USER LOGIN FEATURES ***********************************//
router.post('/login',
    [
        //check not empty field:
        check('email').isEmail().normalizeEmail(),
        check('password').not().isEmpty().trim().escape(),
    ],
    function (req, res) {
        //checking validation:
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({  // error code '422' is kind of error status:
                status: false,
                message: "form validation errors",
                errors: errors.array() //converting error in array formate:
            });
        };
        //check email exists or not:
        User.findOne(
            { email: req.body.email },
            function (error, result) {
                //check error:
                if (error) {
                    return res.json({
                        status: false,
                        message: "database reading failed!",
                        errors: error
                    });
                }
                //result is empty or not:
                if (result) {
                    //when result variable contain data:
                    //match password:
                    const isMatch = bcrypt.compareSync(req.body.password, result.password);
                    //check pasword if it is matched:
                    if (isMatch) {
                        // when password matched:
                        //   return res.json({
                        //     status:true,
                        //     message:"user exists and password matched so login successfull",
                        //     result:result
                        //   });
                        return res.redirect('/mytodos');
                    }
                    else {
                        return res.json({
                            status: false,
                            message: "user exist but password not matched, login failed",
                        });
                    }
                } else {
                    // user document doesnt exist:
                    return res.json({
                        status: false,
                        message: "user doesn't exist"
                    });
                }
            }
        );
    }
);



//********************************** WORKING ON TODO LIST FEATURES ***********************************//

// router.get('/mytodos/:id',function(req,res){
//     res.redirect('/mytodos');
// })


//Rendering all todolists from database:
router.get('/mytodos', function(req,res){
    Todolist.find(function(error,todoList){
        if(error) {
            throw error
        }
        else {
            // res.render('./layouts/create-todo.hbs')
            res.render('./layouts/create-todo.hbs', {todoList: todoList});
        }
    }).lean()
});


//Creating a create and save features of todolists:
router.post('/save_todolist',function(req,res){
    const newTodolist = new Todolist({
        todoTask: req.body.todoTask,
    });
    newTodolist.save(function(error,todlistResult){
        if(error) {
            throw error
        }
        else {
            return res.redirect('/mytodos');
            //console.log("TodoList documents : " + todlistResult);
        }
    });
});

//Creating a delete features of todolists:
router.get('/deletetodo/:id',function(req,res){
    Todolist.remove({_id:req.params.id},function(error,deleteTodo){
        if(error) {
            throw error
        }
        else {
            res.redirect('/mytodos')
        }
    });
});





//********************************** WORKING ON QUOTES FEATURES ***********************************//
//Rendering all quotes from database:
router.get('/myquotes',function(req,res){
    Quotes.find(function(error,QuotesList) {
        if(error) {
            throw error
        }
        else {
            res.render('./layouts/create-quotes.hbs',{
                QuotesList : QuotesList
            });
            // console.log(quotesResult);
        }
    }).lean();
 });


//Creating a create and save features of quotes:
router.post('/save_quotes',function(req,res){
    const newQuotes = new Quotes({
        quoteTitle: req.body.quoteTitle,
        quoteSignature: req.body.quoteSignature,
        quoteContent: req.body.quoteContent
    });
    newQuotes.save(function(error,doc){
        if(error) {
            throw error
        }
        else {
            res.redirect('/myquotes')
        }
    });
});


//Creating a update features of quotes:
router.post('/updateQuote',function(req,res){
    const quoteId = req.body.id;
    Quotes.update(
        {_id:quoteId},
        {
            quoteTitle: req.body.quoteTitle,
            quoteSignature:req.body.quoteSignature,
            quoteContent: req.body.quoteContent
        },
        function(error,updatedQuote) {
            if(error) {
                res.send(error)
            }
            else {
                res.redirect('/myquotes')
            }
        }
    )
    
});


//Creating a delete features of quotes:
router.get('/deletequotes/:id',function(req,res){
    if(req.params.id) {
        Quotes.remove({_id:req.params.id},function(error,delRes){
            if(error) {
                throw error
            }
            else {
                res.redirect('/myquotes')
            }
        });
    }
})




//********************************** WORKING ON PROJECTS FEATURES ***********************************//

//Rendering all projects from database:
router.get('/myprojects',function(req,res){
    Projects.find(function(error,projectsList) {
        if(error) {
            throw error
        }
        else {
            res.render('./layouts/create-project.hbs',{
                projectsList : projectsList
            });
        }
    }).lean();
 });

//Creating a create and save features of projects:
router.post('/save_projects',function(req,res){
    const newProjects = new Projects({
        projectTitle:req.body.projectTitle,
        projectContent: req.body.projectContent,
    });
    newProjects.save(function(error,doc){
        if(error) {
            throw error
        }
        else {
            res.redirect('/myprojects');
        }
    });
});



//Creating a update features of projects:
router.post('/updateProject',function(req,res){
    const projectId = req.body.id;
    Projects.update({_id:projectId},
        {
            projectTitle: req.body.projectTitle,
            projectContent: req.body.projectContent
        },
        function(error,updatedProject){
        if(error) {
            throw error
        }
        else {
            res.redirect('/myprojects');
        }
    });
});


//Creating a delete features of projects:
router.get('/deleteprojects/:id',function(req,res){
    Projects.remove({_id: req.params.id},function(error,deletedProject){
        if(error) {
            throw error
        }
        else {
            res.redirect('/myprojects')
        }
    });
});

//module exports:
module.exports = router;
