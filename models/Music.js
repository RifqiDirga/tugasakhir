const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
    title: String,
    url: String,
    duration: Number,
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
});

module.exports  = mongoose.model('Music', MusicSchema);