var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ShopSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    recivingOrder:{
        type: [{
            Orderid: {
                type: mongoose.Types.ObjectId,
                ref: 'Order'
            }
        }]
    }
});

module.exports =new mongoose.model('Shop',ShopSchema);