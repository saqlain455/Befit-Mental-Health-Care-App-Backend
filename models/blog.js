var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var BlogSchema= new Schema({
    title:{
        type:String
    },
    catogery:{
        type:String
    },
    poster:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    dateOfcreation:{
        type:Date
    },
    content:{
        type:String
    },
    comments: [{ body: String, date: {type:Date , default:Date.now }}]
});

module.exports=new mongoose.model('Blog',BlogSchema)
