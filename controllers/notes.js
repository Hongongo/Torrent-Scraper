var Note = require('../models/Note');

module.exports = {
    get: function (data, cb) {
        Note.find({
            _headlineId: data._id
        }, cb);
    }, // get
    save: function(data, cb){
        var newNote = {
            _headlineId: data._id,
            noteText: data.noteText
        };
        Note.create(newNote, function(err, doc){
            if (err){console.log(err);}
            else{
                console.log(doc);
                cb(doc);
            }
        }); // Note.create();
    }, // save
    delete: function (data, cb) {
        Note.remove({_id: data._id}, cb); // Note.remove();
    } // delete
}; // module.exports