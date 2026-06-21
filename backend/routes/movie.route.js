const { Router } = require('express');
const movieController = require("../controllers/movie.controller");

const router = Router();

router.get("/categories", movieController.getMovies);
router.get("/details/:id", movieController.movieDetails);
router.get("/video/:id", movieController.getVideo);
router.get("/search", movieController.searchMovie);

module.exports = router;