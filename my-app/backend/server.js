const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config(); 


app.use(cors());
app.use(express.json());
const url ="mongodb+srv://admins:57J6o1uyZUJ2VdJG@cluster0.9rig3.mongodb.net/LinkedInWebscraper?retryWrites=true&w=majority"
console.log(url)
// Connect to MongoDB using async/await
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");

        // Define a schema for the 'internships' collection
        const internshipSchema = new mongoose.Schema({
            title: { type: String, required: true },
            description: { type: String, required: true },
            company: { type: String, required: true },
            datePosted: { type: Date, default: Date.now }
        }, { collection: 'Internships' });
        const Internship = mongoose.model('Internships', internshipSchema);

        // Define a route to fetch internships
        app.get('/api/Internships', async (req, res) => {
            try {
                const internships = await Internship.find();
                console.log(internships)
                res.json(internships);
            } catch (err) {
                console.error('Error fetching data:', err);
                res.status(500).send({ message: "Error fetching data" });
            }
        });

        // Start the server
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });

    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });
