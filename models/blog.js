var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var BlogSchema= new Schema({
    title:{
        type:String
    },
    poster:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Doctor'
    },
    date:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String
    },
    comments: [{ body: String, date: {type:Date , default:Date.now }}],
    img: { data: Buffer, contentType: String },

});

module.exports=new mongoose.model('Blog',BlogSchema)
