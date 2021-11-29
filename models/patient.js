var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var Patient = new Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type:String
    },
    phoneNo:String,
    cnic: {
        type: String
    },
    address:{
        type:String
    },
    gender:{
        type:String
    },
    Dob:{
        type:Date
    },
    Age:{
        type:Number
    },
    img: { data: Buffer, contentType: String },

});

module.exports = mongoose.model('Patient', Patient);