const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('multer')({ dest: 'uploads/' });
const { extractText } = require('./ocr'); // Import OCR function
const Card = require('./models/Card'); // Import Card model


const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

mongoose.connect("mongodb://localhost:27017/visiting_cards")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// API to handle file upload and OCR
app.post('/upload', fileUpload.single('image'), async (req, res) => {
    try {
        const extractedData = await extractText(req.file.path);
        const card = new Card({ ...extractedData });
        await card.save();
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API to retrieve all stored entries
app.get('/cards', async (req, res) => {
    const cards = await Card.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(cards);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
