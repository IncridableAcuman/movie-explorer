module.exports = class MovieResponse {
    backdrop_path;
    id;
    original_title;
    genre_ids;
    overview;
    poster_path;
    release_date;
    title;
    original_language;
    constructor(data){
        this.backdrop_path=data.backdrop_path;
        this.id=data.id;
        this.original_title=data.original_title;
        this.genre_ids=data.genre_ids;
        this.overview=data.overview;
        this.poster_path=data.poster_path;
        this.release_date=data.release_date;
        this.title=data.title;
        this.original_language=data.original_language;
        
    }
}