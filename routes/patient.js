var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var Patient = require('../models/patient');
var Doctor = require('../models/doctor');
var Shop = require('../models/MedicineShop');
var Order = require('../models/order');
var Blog = require('../models/blog');
var Appointment = require('../models/appointment');
var path = require('path');
var fs = require('fs');
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



router.get('/', authenticate.verifyUser, function (req, res, next) {
    
    res.json('Patient dashboard');
});


router.get('/doctors', authenticate.verifyUser, function (req, res, next) {
    Doctor.find({ verify: true }).sort('name').exec(function (error, results) {
        if (error) {
            return next(error);
        }   
        // Respond with valid data
        res.json(results);
    });
});

router.get('/getownData/:id',authenticate.verifyUser,function(req,res,next){
 
    Patient.findById({_id:req.params.id}).exec(function(error,results){
      if(error){
          next(error);
      }
      res.json(results);  
    })
})

router.get('/doctors/:city', authenticate.verifyUser, function (req, res, next) {
    //   res.send('respond with a search doctor with city name');
    Doctor.find({ city: req.params.city }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.get('/blog', function (req, res, next) {
    //res.send('respond with a total no of blogs');
    Blog.find({}).populate('poster').exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});


router.get('/Order/:uid', function (req, res, next) {
    // Order.find(
    //     req.params.id,
    //     function(err, doc) {
    //     console.log(doc.img)
    //         if (err) console.log(err);
    //     res.contentType(doc.img.contentType);
    //     res.send(doc.img.data);
    //     });

    Order.findOne({ buyer: req.params.uid }).exec(function (error, doc) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        console.log(doc)
        // console.log(doc.img.contentType)
        //   res.contentType(doc.img.contentType);
        //    res.send(doc.img.data);
        res.send(doc);
    });
});

//Post
router.post('/BookAppointment', authenticate.verifyUser, function (req, res, next) {
    Appointment.create(req.body)
        .then((data) => {
            console.log('appointment created ', data);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }, (err) => next(err))
        .catch((err) => next(err));
});

// contiune with Accepted appointemnt cancle appointment 


router.get('/ViewAppointment/:uid',authenticate.verifyUser, function (req, res, next) {

    Appointment.find({ patient: req.params.uid }).populate('doctor').exec(function (error, doc) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        console.log(doc)
        // console.log(doc.img.contentType)
        //   res.contentType(doc.img.contentType);
        //    res.send(doc.img.data);
        res.send(doc);
    });
});



router.post('/OrderMedicine', upload.single('filesent'), function (req, res, next) {
    var rec = new Order;
    rec.buyer = req.body.buyer_id;
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


    // Order.create(req.body)
    // .then((data) => {
    //     console.log('Order send', data);
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(data);
    // }, (err) => next(err))
    // .catch((err) => next(err));
});

//Puts
router.put('/addcomment/:blogid', authenticate.verifyUser, function (req, res, next) {
    Blog.findOneAndUpdate({ _id: req.params.blogid }, {
        "$push": {
            "comments": {
                "body": req.body.body
            }
        }
    }, { new: true, upsert: false },
        function (error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
})


//post

// router.post('/createdoctor',authenticate.verifyUser,function(req,res,next){
//     console.log(req.body.name);
//     Doctor.create(req.body)
//         .then((doctor) => {
//             console.log('doctor has been Added ', doctor);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(doctor);
//         }, (err) => next(err))
//         .catch((err) => next(err));
// });




//Delete
router.delete('/delappointment/:id', authenticate.verifyUser, function (req, res, next) {
    Appointment.deleteOne({ _id: req.params.id }, function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});



function a() {

}



var voiceid = ''
router.post('/sendVoice', upload.single('filesent'), function (req, res, next) {
    console.log(req.file.path)
    const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            authorization: "1ddcf7a5209341e7800afb87a4faae06",
            "content-type": "application/json",
            "transfer-encoding": "chunked",
        },
    });
    const assembly1 = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            authorization: "1ddcf7a5209341e7800afb87a4faae06",
            "content-type": "application/json",
        },
    });
    const file = req.file.path;

    fs.readFile(file, (err, data) => {
        console.log(data)
        // if (err) return console.error(err);
        assembly
            .post("/upload", data)
            .then((respo) => {
                console.log(respo.data.upload_url);
                assembly.post(`/transcript`, {
                    audio_url: respo.data.upload_url
                })
                    .then((r) => {
                        console.log(r.data.id)
                        voiceid = r.data.id
                        console.log("id is ", voiceid)
                        if (voiceid != '') {
                            return res.send({ 'VOICEID': voiceid });
                        }
                    })
                    .catch((err) => console.log(err));
            });

    })
    // res.json(voiceid);

});


router.get('/transcript/:id', function (req, res, next) {
    console.log("i am here")
    console.log(req.params.id)


    const assembly2 = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            authorization: "1ddcf7a5209341e7800afb87a4faae06",
            "content-type": "application/json",
        },
    });

    assembly2
        .get(`/transcript/${req.params.id}`)
        .then((rs) => {
            console.log('my response is .....', rs.data)
            res.send(rs.data);
        })
        .catch((err) => console.error(err));

});

// const FormData = require('form-data');
router.get('/predictText/:text', function (req, res, next) {
    console.log("i am here")
    console.log(req.params.text)
    var textm = req.params.text
    //   var formData = new FormData();
    //   formData.append('text', JSON.stringify(textm));
    const assembly2 = axios.create({
        baseURL: "http://127.0.0.1:5000",
        params: ({ 'text': textm })
    });

    assembly2
        .post(`/predict`)
        .then((rs) => {
            console.log('my response is .....', rs.data)
            res.send(rs.data);
        })
        .catch((err) => console.error(err));

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

router.put('/updateProfile/:id', function (req, res, next) {
    
    Patient.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: false },
        function (error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
})

router.put('/updateProfilePic/:id', upload.single('filesent'),function (req, res, next) {
    
   var image={ img:{data : fs.readFileSync(req.file.path),
    contentType : 'image/png'}}

    Patient.findOneAndUpdate({ _id: req.params.id },image, { new: true, upsert: false },
        function (error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
})


module.exports = router;