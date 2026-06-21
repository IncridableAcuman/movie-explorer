const movieService = require("../services/movie.service");
class MovieController {
    async getMovies(req,res,next){
        try {
            const {category}=req.query;
            const movies = await movieService.getMovies(category);
            return res.status(200).json({success:true, movies});
        } catch (error) {
            next(error);
        }
    }

    async movieDetails(req,res,next){
        try {
            const {id}=req.params;
            const movies = await movieService.movieDetails(id);
            return res.status(200).json({success:true, movies});
        } catch (error) {
            next(error);
        }
    }
    async getVideo(req,res,next){
        try {
            const {id}=req.params;
            const movies = await movieService.getVideo(id);
            return res.status(200).json({success:true, movies});
        } catch (error) {
            next(error);
        }
    }
    async searchMovie(req,res,next){
        try {
            const {query}=req.query;
            const movies = await movieService.searchMovie(query);
            return res.status(200).json({success:true, movies});
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new MovieController();