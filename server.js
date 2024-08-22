const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const EnsRecord = require('./models/ensModel'); // Import the ENS model

const app = express();
app.use(bodyParser.json());
const cors = require('cors');

app.use(cors());
const mongoUri = 'mongodb+srv://msatya2k3:iyQkBsbHTis8cmvs@cluster0.7h7dc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Route to update the link for an existing ENS name
app.put('/updateLink', async (req, res) => {
    const { ensName, oldLink, newLink } = req.body;

    try {
        const record = await EnsRecord.findOne({ ensName, link: oldLink });

        if (record) {
            record.link = newLink;
            await record.save();

            res.status(200).json({ message: 'Link updated successfully.' });
        } else {
            res.status(404).json({ message: 'ENS name or link not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred.' });
    }
});


// Route to store the ENS name and link
app.post('/storeLink', async (req, res) => {
    const { ensName, link } = req.body;

    try {
        const existingRecord = await EnsRecord.findOne({ ensName });

        if (existingRecord) {
            return res.status(400).json({ message: 'ENS name already exists.' });
        } 

        const newRecord = new EnsRecord({ ensName, link });
        await newRecord.save();

        res.status(201).json({ message: 'ENS name and link saved successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred.' });
    }
});
// Route to handle redirection
app.get('/redirect/:ensName', async (req, res) => {
    const { ensName } = req.params;

    try {
        const record = await EnsRecord.findOne({ ensName });

        if (record) {
            const fullUrl = record.link.startsWith('http://') || record.link.startsWith('https://')
                ? record.link
                : `http://${record.link}`;

            res.writeHead(301, {
                'Location': fullUrl,
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store'
            }).end();
        } else {
            res.status(404).json({ message: 'ENS name not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred.' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
