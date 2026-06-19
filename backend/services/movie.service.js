const BaseError = require("../errors/base.error");
const MovieResponse = require("../dto/movie.dto");
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const axios = require("axios");

class MovieService {

    async getMovies(category){
        if(!category){
            throw BaseError.BadRequest("Category must be required");
        }
        const {data} = await axios.get(`${API_URL}/movie/${category}?language=en-US&page=1&api_key=${API_KEY}`);
        return data.results.map(result=> new MovieResponse(result));
    }
}
module.exports = new MovieService();