var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var PrescibedSchema = new Schema({
    patient_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    date:{
        type:Date,
        default:Date.now
    },
    img: { data: Buffer, contentType: String },

    description: {
        type: String,
    },
    doctor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    }
});

module.exports = mongoose.model('Prescribe', PrescibedSchema);
