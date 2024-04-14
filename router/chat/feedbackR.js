const express = require('express');
const router = express.Router();
const Performance = require('../../model/PerformanceModel');
// const { createObjectCsvWriter } = require('csv-writer');
const { authorizeRole } = require('../../middleware/role');
const { auth } = require('../../middleware/auth');
const jsonexport = require('jsonexport');
const pushFeedback=async(req,res)=>{
    try {
        // Extract feedback and transcripts from the request body
        const { feedback, transcripts } = req.body;

        // Check if feedback and transcripts are provided
        if (!feedback || !transcripts || !Array.isArray(transcripts) || transcripts.length === 0) {
            return res.status(400).json({ message: 'Feedback and transcript is required'});
        }
        const finaltranscripts = [];
        for (let i = 0; i < transcripts.length; i++) {
            const transcript = { question: 'NA', answer: 'NA' };
            if (transcripts[i].sender === 'user') {
               transcript.question=transcripts[i].text;
            }
            if(i+1<transcripts.length && transcripts[i+1].sender === 'chatbot'){
                transcript.answer=transcripts[i+1].text;
                i++;
            }
            finaltranscripts.push(transcript);
        }
    //   console.log(finaltranscripts);
          const newData = new Performance({
            feedback,
            transcripts: finaltranscripts
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
//Approch-1( taking space at server)
// const downloadPerfomance=async(req,res)=>{
//     try {
//         // Fetch all data from the Performance collection
//         const data = await Performance.find({});
        
//         // Check if there is any data
//         if (!data || data.length === 0) {
//             return res.status(404).json({ message: 'No feedback data found.' });
//         }
        
//         // Define the CSV file path and name
//         const filePath = './feedback.csv';
        
//         // Create a CSV writer
//         const csvWriter = createObjectCsvWriter({
//             path: filePath,
//             header: [
//                 { id: 'feedback', title: 'Feedback' },
//                 { id: 'question', title: 'Question' },
//                 { id: 'answer', title: 'Answer' }
//             ]
//         });
        
//         // Write data to the CSV file
//         await csvWriter.writeRecords(data.map(item => ({
//             feedback: item.feedback,
//             question: item.transcripts.map(transcript => transcript.question).join('\n'),
//             answer: item.transcripts.map(transcript => transcript.answer).join('\n')
//         })));
        
//         // Send the CSV file as a response
//         res.download(filePath, 'feedback.csv', (err) => {
//             if (err) {
//                 console.error('Error downloading CSV file:', err);
//                 return res.status(500).json({ message: 'Internal server error.' });
//             }
//             // Delete the temporary CSV file after sending
//             fs.unlinkSync(filePath);
//         });
//     } catch (error) {
//         console.error('Error generating CSV file:', error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// }
 
const downloadPerfomance=async(req,res)=>{
    try {
        // Fetch all data from the Performance collection
        const data = await Performance.find({});
        
        // Check if there is any data
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No feedback data found.' });
        }

        // Format data for CSV conversion
        const csvData = data.map(item => ({
            feedback: item.feedback,
            question: item.transcripts.map(transcript => transcript.question).join('\n'),
            answer: item.transcripts.map(transcript => transcript.answer).join('\n')
        }));

        // Convert JSON data to CSV format using jsonexport
        jsonexport(csvData, function(err, csv){
            if(err) {
                console.error('Error generating CSV:', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }
            // Set response headers for CSV download
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="feedback.csv"');

            // Send the CSV data as response
            res.send(csv);
        });

    } catch (error) {
        console.error('Error fetching performance data:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
router.route('/download/perfomance').get(auth,authorizeRole('admin'),downloadPerfomance);
module.exports = router;
