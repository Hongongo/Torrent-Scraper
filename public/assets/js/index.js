$(document).ready(function () {
    var torrentContainer = $('#scraped-container');
    //var favBtn = $('.btn.save');
    var hiddenBtn = $('.hidden-id');
    $(document).on('click','#btn-scrape', scrapeTorrents);
    $(document).on('click', '#btn-delete', deleteTorrents);
    //$(document).on('click', favBtn, favTorrent);

    //initPage();

    // Loads page content
    function initPage() {
        torrentContainer.empty();
        $.get('/api/headlines?saved=false').then(function (torrents) {
            if (torrents && torrents.length){
                console.log(torrents)
                renderTorrents(torrents);
            } else{
                renderEmpty();
            }
        })
    }

    function renderTorrents(torrents) {
        var torrentItems = [];
        for(var i = 0; i < torrents.length; i++){
         torrentItems.push(createItem(torrents[i]));
        }
        torrentContainer.append(torrentItems);
    }

    // Creates torrent item view
    function createItem(torrent) {
        var item =
            $([
                "<div id=\"",
                torrent._id,
                "\" class=\"col-md-4 col-sm-6 torrent-item\">",
                "<div class=\"row\">",
                " <div class=\"icon col-md-4 col-sm-4\"> <a href=\"{{this.url}}\"><img src=\"/../../assets/images/pb-logo-small.png\" alt=\"\" /> </a></div>",
                "<div class=\"text col-md-8 col-sm-6\">",
                "<p>",
                torrent.title,
                "</p>",
                "</div>",
                "</div>",
                "<div class=\"row\">",
                "<div class=\"text col-md-12\">",
                "<p>",
                torrent.author,
                "</p>",
                "</div>",
                "</div>",
                "<a data-id=\"",
                torrent._id,
                "\" class=\"btn save col-md-12\">Save</a>",
                "</div>"
            ].join(""));
        item.data('_id', torrent._id);
        return item;
    }

    // Loads empty page with no data
    function renderEmpty(){
        var emptyAlert =
            $([
                "<div>",
                "<h4> Looks like we don't have new torrents</h4>",
                "</div>",
                "<div>",
                "<h4><a class='scrape-new'>Try Scraping New Torrents</a></h4>",
                "</div>"
            ].join(""));
        torrentContainer.appendChild(emptyAlert);
    }

    function scrapeTorrents() {
        $.get('/api/fetch').then(function (data) {
            initPage();
            // todo alert with number of rows or something that got added
        })
    }

    function deleteTorrents() {

    }

    function favTorrent() {
        var torrentToSave = $(this).parents().data();
        console.log($(this).data('id'));
        console.log(torrentToSave);
        torrentToSave.saved = true;
        $.ajax({
           method: 'PATCH',
           url: '/api/headlines',
           data: torrentToSave
        }).then(function (data) {
            if (data.ok){
                console.log('favtorrent ok')
                initPage();
            }
        });
    }

    $('.save').on('click', function(){
        var id = $(this).data('id');
        console.log(id);
        $.ajax({
           method: 'PATCH',
           url: '/api/headlines/',
            data: {id: id}
        }).then(function(data){
            if (data.ok){
                console.log('saved modified');
                // init page?
            }
        });
    });
});