
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Admin = new Schema({
    name: {
        type: String,
        default: ''
    }
});
module.exports = mongoose.model('Admin', Admin);