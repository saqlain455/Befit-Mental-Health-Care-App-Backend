var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var Blog=require('../models/blog');
var Appointment=require('../models/appointment');
var Prescribe=require('../models/prescribed')
//Get
var fs = require('fs');
var path = require('path');
var multer = require('multer')
const axios = require("axios");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })
//Get

router.get('/',authenticate.verifyUser,authenticate.verifyDoctor, function(req, res, next) {
        res.json('Doctor dashboard'+req.user._id);
});

router.get('/blog',authenticate.verifyUser, function(req, res, next) {
    //res.send('respond with a total no of blogs that he upload');
    Blog.find({poster:req.user._id}).populate('poster').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

// router.get('/appointments',authenticate.verifyUser,authenticate.verifyDoctor, function(req, res, next) {
//     Appointment.find({doctor:req.user._id}).exec(function(error, results) {
//             if (error) {
//                 return next(error);
//             }
//             // Respond with valid data
//             res.json(results);
//         });
// });

router.get('/ViewAppointment/:uid',function (req, res, next) {

    Appointment.find({ doctor: req.params.uid }).populate('patient').exec(function (error, doc) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        console.log(doc)
        // console.log(doc.img.contentType)
        //   res.contentType(doc.img.contentType);
        //    res.send(doc.img.data);
        res.json(doc);
    });
});
//post 

router.post('/addblog', upload.single('blogsent'), function (req, res, next) {
    var rec = new Blog;
    rec.poster = req.body.poster;
    rec.content = req.body.description;
    rec.title=req.body.title;
    rec.img.data = fs.readFileSync(req.file.path);
    rec.img.contentType = 'image/png';
    rec.save((err, result) => {
        console.log(result)

        if (err) return next(err)
        console.log('saved to database')
        res.statusCode = 200;
        res.send(rec);
    })
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

router.put('/cancelAppointment/:id', function (req, res, next) {
    
    Appointment.findOneAndUpdate({ _id: req.params.id },{status:'canceled'}, { new: true, upsert: false },
        function (error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
})

router.put('/acceptAppointment/:id', function (req, res, next) {
    
    Appointment.findOneAndUpdate({ _id: req.params.id },{status:'accepted'}, { new: true, upsert: false },
        function (error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
})



router.post('/PrescribeMedicine', upload.single('filesent'), function (req, res, next) {
    var rec = new Prescribe;
    rec.patient_id = req.body.patient_id;
    rec.doctor_id = req.body.doctor_id;
    rec.description = req.body.description;
    rec.img.data = fs.readFileSync(req.file.path);
    rec.img.contentType = 'image/png';
    rec.save((err, result) => {
        console.log(result)

        if (err) return next(err)
        console.log('saved to database')
        res.statusCode = 200;
        res.send(rec);
    })
});
module.exports = router;