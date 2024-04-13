const mongoose = require('mongoose');
const SalesDataModelSchema = new mongoose.Schema({
    email:String,
    question: String,
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports = new mongoose.model('Sales', SalesDataModelSchema);
