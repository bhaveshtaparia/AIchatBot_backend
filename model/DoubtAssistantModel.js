const mongoose = require('mongoose');
const doubtAssistantSchema = new mongoose.Schema({
    question: String,
    answer: {
        type:String,
        default:"NA"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports = new mongoose.model('Doubt', doubtAssistantSchema);
