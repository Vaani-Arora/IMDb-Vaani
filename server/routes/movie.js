import express from 'express'
import {
  getMovies,
  getMovieById,
} from '../controllers/movieController.js'

const router = express.Router()

router.route('/movie').get(getMovies)
router.route('/:id').get(getMovieById)

export default router