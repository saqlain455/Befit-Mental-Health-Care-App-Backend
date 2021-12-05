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
    reportData: {
        type: Object,
        default:{
            "anger": 0,
            "boredom": 0,
            "fear": 0,
            "hate": 0,
            "insomnia": 0,
            "sadness": 0,
          }
      },
});
module.exports = mongoose.model('Appointment', appointmentSchema);