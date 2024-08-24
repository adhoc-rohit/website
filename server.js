const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/qunite', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define a schema and model for contact messages
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Handle form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const contact = new Contact({
        name,
        email,
        message
    });

    contact.save()
        .then(() => {
            res.send('Message received');
        })
        .catch(error => {
            console.error('Error saving message:', error);
            res.status(500).send('Error saving message');
        });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

