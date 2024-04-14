// Import necessary libraries
const express = require('express');
// const csvtojson = require('csvtojson');
const Doubt = require('../../model/DoubtAssistantModel');
const { auth } = require('../../middleware/auth');
const {authorizeRole}=require('../../middleware/role');
const { addDoubt } = require('./doubtAssistanceFunction');
// const { createObjectCsvWriter } = require('csv-writer');
const jsonexport = require('jsonexport');
const router=express.Router();
router.route('/doubt').post(auth,addDoubt);

// First approch ->downloding file in Server
// const downloadDoubtData=async(req,res)=>{
//     try {
//         // Fetch all doubts from the Doubt collection
//         const doubts = await Doubt.find({});
        
//         // Check if there are any doubts
//         if (!doubts || doubts.length === 0) {
//             return res.status(404).json({ message: 'No doubts found.' });
//         }
        
//         // Define the CSV file path 
//         const filePath = './doubts.csv';
        
//         // Create a CSV writer
//         const csvWriter = createObjectCsvWriter({
//             path: filePath,
//             header: [
//                 { id: 'question', title: 'Question' },
//                 { id: 'answer', title: 'Answer' },
//                 { id: 'createdAt', title: 'CreatedAt' }
//             ]
//         });
        
//         // Write doubts data to the CSV file
//         await csvWriter.writeRecords(doubts.map(doubt => ({
//             question: doubt.question,
//             answer: doubt.answer,
//             createdAt: doubt.createdAt
//         })));
        
//         // Send the CSV file as a response
//         res.download(filePath, 'doubts.csv', (err) => {
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

const downloadDoubtData=async(req,res)=>{
    try {
      
        const doubts = await Doubt.find({});
        
        if (!doubts || doubts.length === 0) {
            return res.status(404).json({ message: 'No doubts found.' });
        }
        const formattedData = doubts.map(doubt => ({
            question: doubt.question,
            answer: doubt.answer,
            createdAt: new Date(doubt.createdAt).toLocaleString()
        }));


        jsonexport(formattedData, { headers: ['question', 'answer', 'createdAt'] }, function(err, csv){
            if(err) {
                console.error('Error generating CSV:', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }
          
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="doubts.csv"');

            res.send(csv);
        });
    } catch (error) {
        console.error('Error generating CSV file:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

router.route('/download/doubt').get(auth,authorizeRole('admin'),downloadDoubtData);
module.exports = router;
