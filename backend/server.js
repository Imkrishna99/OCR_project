const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('multer')({ dest: 'uploads/' });
const { extractText } = require('./ocr'); // Import OCR function
const Card = require('./models/card'); // Import Card model
const dotEnv = require("dotenv").config()


const app = express();
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

mongoose.connect(process.env.MONGO_URL)
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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
