
const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    question: String,
    answer: String
});
module.exports = new mongoose.model('Chat', chatSchema);
