const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name: String,
    bio: String,
    image: String,
});

module.exports = mongoose.model('Artist', ArtistSchema);