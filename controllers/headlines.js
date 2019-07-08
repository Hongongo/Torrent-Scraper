var scrape = require('../scripts/scrape');

var HeadLine = require('../models/Headline');

module.exports = {
    fetch: function(cb){
        scrape(function (data) {
            var articles = data;
            for (var i = 0; i < articles.length; i++){
                articles[i].saved = false;
            }
            HeadLine.collection.insertMany(articles, {ordered:false}, function (err, docs){
                cb(err, docs);
            }); // Headline.collection.insertMany();
        }); // scrape();
    }, // fetch
    delete: function (query, cb) {
        HeadLine.remove(query, cb);
    }, // delete
    get: function (query, cb) {
        HeadLine.find(query)
            .sort({_id: -1})
            .exec(function(err, doc){ cb(doc);});
    }, // get
    update: function (query, cb) {
        HeadLine.update({_id: query._id}, {
            $set: query
        }, {}, cb)
    }
}; // module.exports