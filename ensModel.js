const mongoose = require('mongoose');

// Define a schema for ENS names and URLs
const ensSchema = new mongoose.Schema({
    ensName: { type: String, required: true },
    link: { type: String, required: true },
});

const EnsRecord = mongoose.model('EnsRecord', ensSchema);

module.exports = EnsRecord;
