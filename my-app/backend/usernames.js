const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config(); 


app.use(cors());
app.use(express.json());
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

        app.get('/api/Passwords', async (req, res) => {
            try {
                const users = await Users.find();
                console.log(users)
                res.json(users);
            } catch (err) {
                console.error('Error fetching data:', err);
                res.status(500).send({ message: "Error fetching data" });
            }
        })
        const PORT = 5000
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

    }).catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });



