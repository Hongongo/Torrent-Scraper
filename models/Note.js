var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notesSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: 'Headline'
    },
    date: {
        type: Date,
        default: Date.now
    },
    noteText: String
}); // notesSchema

var Note = mongoose.model('Note', notesSchema);
module.exports = Note;