var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RatingSchema = new Schema({
    starvalue: {
        type: String,
    },
    review:{
        type:String,
        default: ''
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required:true
    }
});
module.exports = mongoose.model('Rating', RatingSchema);