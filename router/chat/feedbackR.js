const express = require('express');
const router = express.Router();
const Performance = require('../../model/PerformanceModel');

const pushFeedback=async(req,res)=>{
    try {
        // Extract feedback and transcripts from the request body
        const { feedback, transcripts } = req.body;

        // Check if feedback and transcripts are provided
        if (!feedback || !transcripts || !Array.isArray(transcripts) || transcripts.length === 0) {
            return res.status(400).json({ message: 'Feedback and transcript is required'});
        }

        const newData = new Performance({
            feedback,
            transcripts
        });

        // Save the new data to the database
        const savedData = await newData.save();

        return res.status(200).json({ message: 'Data added successfully.'});
    } catch (error) {
        console.error('Error adding data:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
router.route('/feedback').post(auth,pushFeedback);
module.exports = router;
