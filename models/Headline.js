var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var headLineSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    }
}); // var = headLineSchema

var HeadLine = mongoose.model('Headline', headLineSchema);
module.exports = HeadLine;