const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
    musics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
});

module.exports = mongoose.model('Group', GroupSchema);