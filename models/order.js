var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    buyer:{
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
    OrderTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop"
    },
    status:{
        type:String,
        default:'pending'
    },
    verify:{
        type:Boolean,
        default: false
    }
});

module.exports = mongoose.model('Order', OrderSchema);
