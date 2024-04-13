
const express = require('express');
const Chat = require('../../model/chat');
const { auth } = require('../../middleware/auth');
const {authorizeRole}=require('../../middleware/role')
const router=express.Router();
const natural = require('natural'); // Import the Natural library for NLP
const Doubt = require('../../model/DoubtAssistantModel');
const Sales=require('../../model/SalesDataModel');
const tokenizer = new natural.WordTokenizer();
async function findMatchingQuestion(userQuery) {
    // Tokenize the user query for better result

    const userTokens = tokenizer.tokenize(userQuery.toLowerCase());

    try {
        // Find questions where any token from the user query matches the question
        const regexPattern = userTokens.join('|');
        const regex = new RegExp(regexPattern, 'i');
        
        const results = await Chat.find({ question: { $regex: regex } });
        
        // console.log(results);
        // If no results, return null
        if (results.length === 0) {
            return null;
        }

        // Calculate the number of matches for each question
        const matchesCount = results.map(question => ({
            question: question.question,
            matches: userTokens.filter(token => question.question.includes(token)).length
        }));

        // Sort the results by the number of matches in descending order
        matchesCount.sort((a, b) => b.matches - a.matches);

        // Return the question with the maximum number of matches
        return matchesCount[0].question;
    } catch (err) {
        console.error('Error finding matching question:', err);
        throw err; // Propagate the error
    }
}

const chatWithUs = async (req, res) => {
    try {
        // Retrieve user's question from request body or query parameters
        // console.log(req.body);
        const userQuery = req.body.question;
        // Check if userQuery is provided
        if (!userQuery) {
            return res.status(400).json({ error: 'Missing user question' });
        }


          // adding data in sales Team  database
          const salesData = new Sales({
            email:req.user.email, // Set the type of data
            question: userQuery // Set the question
        });
        await salesData.save()



        // Find the most accurate matching question using NLP techniques
        const matchingQuestion = await findMatchingQuestion(userQuery);

        // If no matching question found, return an appropriate response
        if (!matchingQuestion) {
            // this is for doubt assistance
            const existingDoubt = await Doubt.findOne({ question:userQuery });   
            if (existingDoubt) {
            }else{
                const newDoubt = new Doubt({
                    question:userQuery,
                });
                await newDoubt.save();
            }
            return res.json({ answer: 'Sorry, I couldn\'t find an answer to that question.' });
        }

        // Retrieve the answer corresponding to the matching question from the database
        const result = await Chat.findOne({ question: matchingQuestion });

        // Send the corresponding answer to the user
        res.json({ answer: result.answer });
    } catch (err) {
        console.error('Error processing user query:', err);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};


router.route('/chat').post(auth,chatWithUs);
module.exports = router;
