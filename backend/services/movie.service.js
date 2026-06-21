const BaseError = require("../errors/base.error");
const MovieResponse = require("../dto/movie.dto");
const MovieDetailsResponse = require("../dto/movieDetails.dto")
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const axios = require("axios");

class MovieService {

    async getMovies(category) {
        if (!category) {
            throw BaseError.BadRequest("Category must be required");
        }
        const { data } = await axios.get(`${API_URL}/movie/${category}?language=en-US&page=1&api_key=${API_KEY}`);
        return data.results.map(result => new MovieResponse(result));
    }

    async searchMovie(query) {
        const {data} = await axios.get(`${API_URL}/search/movie?include_adult=false&api_key=${API_KEY}&query=${query}&language=en-US&page=1`);
        return data.results.map(res=> new MovieResponse(res));
    }
    async movieDetails(id) {
        const { data } = await axios.get(`${API_URL}/movie/${id}?language=en-US&api_key=${API_KEY}`);
        return new MovieDetailsResponse(data);
    }

    async getVideo(id) {
        const { data } = await axios.get(`${API_URL}/movie/${id}/videos?language=en-US&api_key=${API_KEY}`);
        return data;
    }
}
module.exports = new MovieService();