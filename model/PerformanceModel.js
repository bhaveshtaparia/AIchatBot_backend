const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
    feedback: { 
        type: String,
        required: true
    },
    transcripts: [{ 
        question: { type: String, required: true },
        answer: { type: String, required: true }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Performance', performanceSchema);
