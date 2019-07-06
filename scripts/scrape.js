var axios = require('axios');
var cheerio = require('cheerio');

var scrape = function(cb){
    axios.get('https://thepiratebay3.org/index.php?q=evangelion').then(function(response){
        var $ = cheerio.load(response.data);
        var torrents = [];
        $('tr div.detName').each(function (i, element) {
            var title = $(element).children().attr("title");
            var URL = $(element).children().attr("href");
            var author;

            $("tr font.detDesc").each(function(i, element) {
                author = $(element).text().trim();
            });

            // Save these results in an object that we'll push into the results array we defined earlier
            var result = {
                title: title,
                url: URL,
                author: author
            };

            console.log(result);
            torrents.push(result)
        }); //$('tr div.detName').each();
        cb(torrents);
    }); // axios.get().then();

}; // scrape

module.exports = scrape;