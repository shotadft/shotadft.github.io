$(function(){
    const mv_frame = $("#movie_frame");
    const inputURL = $("#urlInput");
    const button = $("#mv_submit");
    const movieId = '';

    function extractYouTubeId(url='') {
        let id = '';
        const regex = /(?:\/|v=)([A-Za-z0-9_-]{11})(?:\?|&|$)/;
        const match = url.match(regex);
        if (match) {
          id = match[1];
        }
        return id;
    }

    button.submit(function() {
        movieId = extractYouTubeId(inputURL);
        console.log(movieId);     
    });
});