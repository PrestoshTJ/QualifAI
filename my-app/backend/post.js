const express = require('express');
const mongoose = require('mongoose')

const bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(express.json())
require('dotenv').config(); 


app.use(cors({ origin: 'http://localhost:3001' }));

const url ="mongodb+srv://admins:57J6o1uyZUJ2VdJG@cluster0.9rig3.mongodb.net/UserInfo?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");

        // Define a schema for the 'user info' collection
        const userinfoSchema = new mongoose.Schema({
            Username: { type: String, required: true },
            Password: { type: String, required: true },
            Skillset: { type: String, required: true}
        }, { collection: 'Passwords' });
        const Users = mongoose.model('Passwords', userinfoSchema);

        app.post('/api/Passwords', async (req, res) => {
            console.log(req)
            try {
                console.log(req)
                const { username, password, skillset } = req.body;

                // Validate input
                if (!username || !password || !skillset) {
                    return res.status(400).json({ message: 'All fields are required.' });
                }

                // Save to database
                const newUser = new Users({ password, skillset, username });
                await newUser.save();

                res.status(201).json({ message: 'User added successfully!', newUser });
            } catch (error) {
                res.status(500).json({ message: 'Server error.', error: error.message });
            }
        });
        
        
        const PORT = 3003
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });

