const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    date: Date,
    content_morning: String,
    content_noon: String,
    content_night: String,
});

noteSchema.methods.getContent = function () {
    return this.content_morning +'\n'+ this.content_noon +'\n'+ this.content_night;
};

var Note = mongoose.model('Note', noteSchema);

module.exports = Note;
