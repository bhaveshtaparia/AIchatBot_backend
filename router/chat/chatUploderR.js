// Import necessary libraries
const express = require('express');
const csvtojson = require('csvtojson');
const Chat = require('../../model/chat');
const { auth } = require('../../middleware/auth');
const {authorizeRole}=require('../../middleware/role')
const router=express.Router();
const chatUploder=async(req,res)=>{
    // Check if a file was uploaded
    if (!req.files || !req.files.csvFile) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // Get the uploaded CSV file
    const csvFile = req.files.csvFile;
    try{
 // Convert CSV to JSON
 const jsonArray = await csvtojson().fromString(csvFile.data.toString());

 // Populate MongoDB with data from JSON
 await Chat.deleteMany({}); // Clear existing data
 await Chat.insertMany(jsonArray);
 res.json({ message: 'Data uploaded successfully' });
    }catch(err){
        console.error('Error uploading data:', err);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
}

router.route('/upload').post(auth,authorizeRole("admin"),chatUploder);
module.exports = router;
