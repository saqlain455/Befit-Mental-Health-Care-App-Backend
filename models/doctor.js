var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var Doctor = new Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNo:String,
    cnic: {
        type: String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pmdc:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    city:{
        type:String,
    },
    experience:{
        type:String,
        required:true
    },
    about:{
        type:String
    },
    verify:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Doctor', Doctor);