class MovieDetailsResponse {
    id;
    title;
    original_title;
    overview;
    poster_path;
    backdrop_path;
    release_date;
    runtime;
    vote_average;
    vote_count;
    status;
    tagline;
    genres;

    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.original_title = data.original_title;
        this.overview = data.overview;
        this.poster_path = data.poster_path;
        this.backdrop_path = data.backdrop_path;
        this.release_date = data.release_date;
        this.runtime = data.runtime;
        this.vote_average = data.vote_average;
        this.vote_count = data.vote_count;
        this.status = data.status;
        this.tagline = data.tagline;
        this.genres = data.genres;
    }
}

module.exports = MovieDetailsResponse;