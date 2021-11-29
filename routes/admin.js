var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var Patient=require('../models/patient');
var Doctor=require('../models/doctor');
var Shop=require('../models/MedicineShop');
var Order=require('../models/order');
var Blog=require('../models/blog');
var Appointment=require('../models/appointment');
var User=require('../models/user');
//Get Operation
router.get('/',authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    res.send('respond with a Admin  Dashboard');
});


router.get('/users',authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    User.find({}).sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.get('/patients',authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    Patient.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.get('/doctors',authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    Doctor.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.get('/blog', function(req, res, next) {
    //res.send('respond with a total no of blogs');
    Blog.find({}).populate('poster').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/orders',authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
    Order.find({}).populate('buyer').populate('OrderFrom').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.get('/orders/:id',authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
   // res.send('show specific orders ');
   Order.findOne({ _id: req.params.id }).populate('buyer').populate('OrderFrom').exec(function(error, results) {
    if (error) {
        return next(error);
    }
    // Respond with valid data
    res.json(results);
    });
});
router.get('/shops', function(req, res, next) {
//    res.send('show registed shop');
    Shop.find({}).populate('recivingOrder').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.get('/shops/:cityName', function(req, res, next) {
    Shop.find({ city: req.params.cityName }).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});


// Apointments booked 
router.get('/appointments', function(req, res, next) {
    Appointment.find({}).exec(function(error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
});



//Put operation




// Assign order to shop
router.put('/assign/shop/:sid/order/:oid',authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
        Shop.findOneAndUpdate({ _id: req.params.sid }, {
            "$push": {
                "recivingOrder": {
                    "Orderid": req.params.oid
                }
            }
        }, { new: true, upsert: false },
        function(error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });        
});





//Post Operation

router.post('/addpatient',authenticate.verifyUser,authenticate.verifyAdmin,function(req,res,next){
    console.log(req.body.name);
    Patient.create(req.body)
        .then((patient) => {
            console.log('patient has been Added ', patient);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(patient);
        }, (err) => next(err))
        .catch((err) => next(err));
});
router.post('/adddoctor',authenticate.verifyUser,authenticate.verifyAdmin,function(req,res,next){
    console.log(req.body.name);
    Doctor.create(req.body)
        .then((doctor) => {
            console.log('doctor has been Added ', doctor);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(doctor);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.post('/addshop',authenticate.verifyUser,authenticate.verifyAdmin,function(req,res,next){
    console.log(req.body.name);
    Shop.create(req.body)
        .then((shop) => {
            console.log('shop has been Added ', shop);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(shop);
        }, (err) => next(err))
        .catch((err) => next(err));
});


//Put Operation

/////////////////////////////////////     start                     /////////////////////


// update role of doctor in user schema and set verify true by getting params id           important                            update role of doctor

// router.put('/Isverifydoctor/:id',authenticate.verifyUser,authenticate.verifyAdmin,function(req,res,next){
//     console.log(req.params.id)
//     User.findOneAndUpdate({_id:req.params.id}, {role: req.body.role,doctor:true},{ new: true, upsert: false },
//     function(error, results) {
//         if (error) {
//             return next(error);
//         }
//         // Respond with valid data
//         res.json(results);
//         next()
//     });     

//     Doctor.findOneAndUpdate({_id:req.params.id}, {verify:req.body.verify},{ new: true, upsert: false },
//     function(error, results) {
//         if (error) {
//             return next(error);
//         }
//         // Respond with valid data
//         res.json(results);
//     });
//  })


///////////              end                        ///////////////


// router.put('/DoneverifyDoctor/:uid',authenticate.verifyAdmin,function(req,res,next){
//     Doctor.findOneAndUpdate({ _id: req.params.uid}, {
//         "verify":true
//     }, { new: true, upsert: false },
//     function(error, results) {
//         if (error) {
//             return next(error);
//         }
//         // Respond with valid data
//         res.json(results);
//     });     
// })



// update role of doctor in user schema and set verify true by getting id from body
    
router.put('/Isverifydoctor',authenticate.verifyUser,authenticate.verifyAdmin,function(req,res,next){
    console.log(req.body._id)
    User.findOneAndUpdate({_id:req.body._id}, {role: req.body.role,doctor:true},{ new: true, upsert: false },
    function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
        next()
    });     

    Doctor.findOneAndUpdate({_id:req.body._id}, {verify:req.body.verify},{ new: true, upsert: false },
    function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
 })



//Delete Operation
router.delete('/delpatient/:id',authenticate.verifyUser,authenticate.verifyAdmin,function(req,res,next){
    Patient.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.delete('/deldoctor/:id',authenticate.verifyUser,authenticate.verifyAdmin,function(req,res,next){
    Doctor.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.delete('/delblog/:id',authenticate.verifyUser,authenticate.verifyAdmin,function(req,res,next){
    Blog.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.delete('/delshop/:id',authenticate.verifyUser,authenticate.verifyAdmin,function(req,res,next){
    Shop.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});


module.exports = router;