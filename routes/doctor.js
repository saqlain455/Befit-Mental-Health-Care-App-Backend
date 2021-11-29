var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var Blog=require('../models/blog');
var Appointment=require('../models/appointment');
//Get

router.get('/',authenticate.verifyUser,authenticate.verifyDoctor, function(req, res, next) {
        res.json('Doctor dashboard'+req.user._id);
});

router.get('/blog',authenticate.verifyUser,authenticate.verifyDoctor, function(req, res, next) {
    //res.send('respond with a total no of blogs that he upload');
    Blog.find({poster:req.user._id}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/appointments',authenticate.verifyUser,authenticate.verifyDoctor, function(req, res, next) {
    Appointment.find({doctor:req.user._id}).exec(function(error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
});

//post 

router.post('/addblog',authenticate.verifyUser,authenticate.verifyDoctor,function(req,res,next){
   // console.log(req.body.title);
    Blog.create(req.body)
        .then((blog) => {
            console.log('blog has been Added ', blog);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(blog);
        }, (err) => next(err))
        .catch((err) => next(err));
});


//delete

router.delete('/delblog/:id',authenticate.verifyUser,authenticate.verifyDoctor,function(req,res,next){
    Blog.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});


module.exports = router;