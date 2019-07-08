var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var headLineSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author:{
        type: String,
        required: true
    },
    url: {
        type: String,
        required: 'Url is required'
    },
    saved: {
        type: Boolean,
        default: false
    }
}); // var = headLineSchema

var HeadLine = mongoose.model('Headline', headLineSchema);
module.exports = HeadLine;