const express = require('express');
const router = express.Router();
const Sales = require('../../model/SalesDataModel');
const { createObjectCsvWriter } = require('csv-writer');
const { authorizeRole } = require('../../middleware/role');
const { auth } = require('../../middleware/auth');
const jsonexport = require('jsonexport');
// Route to download CSV file of sales team data
// first approch->creating file in server
// const downloadSalesTeamData=async(req,res)=>{
//     try {
//         const salesData = await Sales.find({});

//         // Check if there is any data
//         if (!salesData || salesData.length === 0) {
//             return res.status(404).json({ message: 'No sales team data found.' });
//         }

//         // Define the CSV file path and name
//         const filePath = './sales_data.csv';

//         // Create a CSV writer
//         const csvWriter = createObjectCsvWriter({
//             path: filePath,
//             header: [
//                 { id: 'email', title: 'Email' },
//                 { id: 'question', title: 'Question' },
//                 { id: 'createdAt', title: 'CreatedAt' }
//             ]
//         });

//         // Write data to the CSV file
//         await csvWriter.writeRecords(salesData.map(item => ({
//             email: item.email,
//             question: item.question,
//             createdAt: item.createdAt
//         })));

//         // Send the CSV file as a response
//         res.download(filePath, 'sales_data.csv', (err) => {
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

const downloadSalesTeamData=async(req,res)=>{
    try {
     
        const salesData = await Sales.find({});

        if (!salesData || salesData.length === 0) {
            return res.status(404).json({ message: 'No sales team data found.' });
        }

        // Format data for CSV conversion
        const formattedData = salesData.map(item => ({
            email: item.email,
            question: item.question,
            createdAt: new Date(item.createdAt).toLocaleString()
        }));

        // Convert JSON data to CSV format using jsonexport
        jsonexport(formattedData, { headers: ['email', 'question', 'createdAt'] }, function(err, csv){
            if(err) {
                console.error('Error generating CSV:', err);
                return res.status(500).json({ message: 'Internal server error.' });
            }
           
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="sales_data.csv"');
            res.send(csv);
        });

    } catch (error) {
        console.error('Error generating CSV file:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
router.route('/download/salesTeamData').get(auth,authorizeRole('admin'),downloadSalesTeamData);
module.exports = router;