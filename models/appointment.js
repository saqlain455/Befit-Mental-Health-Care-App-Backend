var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var appointmentSchema = new Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required:true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required:true
    },
    date:{
        type:Date
    },
    time:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    // completed: {
    //     type: Boolean,
    //     default: false
    // }
});
module.exports = mongoose.model('Appointment', appointmentSchema);