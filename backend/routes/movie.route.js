const { Router } = require('express');
const movieController = require("../controllers/movie.controller");

const router = Router();

router.get("/categories",movieController.getMovies);

module.exports = router;