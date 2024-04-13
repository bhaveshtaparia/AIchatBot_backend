const express = require('express');
const router = express.Router();
const Performance = require('../../model/PerformanceModel');
const { createObjectCsvWriter } = require('csv-writer');
const { authorizeRole } = require('../../middleware/role');
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
const downloadPerfomance=async(req,res)=>{
    try {
        // Fetch all data from the Performance collection
        const data = await Performance.find({});
        
        // Check if there is any data
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No feedback data found.' });
        }
        
        // Define the CSV file path and name
        const filePath = './feedback.csv';
        
        // Create a CSV writer
        const csvWriter = createObjectCsvWriter({
            path: filePath,
            header: [
                { id: 'feedback', title: 'Feedback' },
                { id: 'question', title: 'Question' },
                { id: 'answer', title: 'Answer' }
            ]
        });
        
        // Write data to the CSV file
        await csvWriter.writeRecords(data.map(item => ({
            feedback: item.feedback,
            question: item.transcripts.map(transcript => transcript.question).join('\n'),
            answer: item.transcripts.map(transcript => transcript.answer).join('\n')
        })));
        
        // Send the CSV file as a response
        res.download(filePath, 'feedback.csv', (err) => {
            if (err) {
                console.error('Error downloading CSV file:', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }
            // Delete the temporary CSV file after sending
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error('Error generating CSV file:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
router.route('/download/perfomance').get(auth,authorizeRole('admin'),downloadPerfomance);
module.exports = router;
