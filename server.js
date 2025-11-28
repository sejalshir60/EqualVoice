const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/equalvoice', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Create a Schema
const formSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    message: String
});

// Create a Model
const Form = mongoose.model('Form', formSchema);

// Route to save form data
app.post('/submit', async (req, res) => {
    const { name, phone, email, text } = req.body;

    try {
        const formData = new Form({
            name,
            phone,
            email,
            message: text
        });

        await formData.save();
        res.send({ success: true, message: "Data saved successfully!" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error saving data", error });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
