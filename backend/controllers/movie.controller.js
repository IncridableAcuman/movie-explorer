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

}
module.exports = new MovieController();