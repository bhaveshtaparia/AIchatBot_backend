const Doubt = require('../../model/DoubtAssistantModel');
const addDoubt = async (req, res) => {
    try {
        const { question, answer } = req.body;

        if (!question) {
            return res.status(400).json({ message: 'question is missing' });
        }

        // Check if the question already exists in the database
        const existingDoubt = await Doubt.findOne({ question });

        if (existingDoubt) {
            return res.status(200).json({ message: 'Question already exists.' });
        }

        // Create a new Doubt document
        const newDoubt = new Doubt({
            question,
            answer
        });

        await newDoubt.save();

        return res.status(200).json({ message: 'Doubt added successfully.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { addDoubt };
