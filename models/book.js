const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

//id is created auto by mongo

module.exports = mongoose.model("Book", bookSchema);