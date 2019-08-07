var scrape = require('../scripts/scrape');
var headlinesController = require('../controllers/headlines');
var notesController = require('../controllers/notes');

module.exports = function(router){
    router.get('/', function (req, res) {
        var query = {};
        if (req.query.saved){
            query = req.query;
        }
        headlinesController.get(query, function (data) {
            res.render('home', {scrape:data});
        });
        //res.render('home');
    }); //router.get('/');

    router.get('/saved', function (req, res) {
        res.render('saved');
    }); // router.get('/saved');

    router.get('/api/fetch', function (req, res) {
        headlinesController.fetch(function (err, docs) {
            if (!docs || docs.insertedCount === 0){
                res.json({
                    message: 'No new torrents today. Check back tomorrow'
                });
            } else{
                res.render({message: 'Added ' + docs.insertedCount + 'new torrents!'},'#scraped-container')
                /*res.json({
                    message: 'Added ' + docs.insertedCount + 'new torrents!'
                });*/
            }
        })
    }) // router.get('/api/fetch');

    router.get('/api/headlines', function (req, res) {
        var query = {};
        if (req.query.saved){
            query = req.query;
        }
        headlinesController.get(query, function (data) {
            res.json(data);
        });
    }); // router.get('/api/headlines')

    router.delete('/api/headlines/:id', function (req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function (err, data) {
            res.json(data);
        });
    }); // router.delete('/api/headlines/:id')

    router.patch('/api/headlines/', function (req, res) {
        console.log(req.body.id);
        headlinesController.update(req.body.id, function (err, data) {
            console.log('update: \n');
            console.log(data);
            res.json(data);
        });
    }) // router.patch('/api/headlines')

    router.get('/api/notes/:headline_id?', function (req, res) {
        var query = {};
        if (req.params.headline_id){
            query._id = req.params.headline_id;
        }
        notesController.get(query, function (err, data) {
            res.json(data);
        });
    }) // router.get('/api/notes/:headline_id?')

    router.delete('/api/notes/:id', function (req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function (err, data) {
            res.json(data);
        });
    }) // router.get('/api/notes/:id')

    router.post('/api/notes', function (req, res) {
        notesController.save(req.body, function(data){
            res.json(data);
        });
    }); // router.post('/api/notes')
}; // module.exports