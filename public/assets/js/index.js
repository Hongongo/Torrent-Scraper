$(document).ready(function () {
    var torrentContainer = $('#scraped-container');
    var favBtn = $('#fav-btn');
    $(document).on('click','#btn-scrape', scrapeTorrents);
    $(document).on('click', '#btn-delete', deleteTorrents);
    $(document).on('click', favBtn, favTorrent);


    function initPage() {
        torrentContainer.empty();
        $.get('/').then(function () {

        })
    }

    function scrapeTorrents() {
        $.get('/api/fetch').then(function (data) {
            console.log(data.message);
        })
    }

    function deleteTorrents() {

    }

    function favTorrent() {

    }
});