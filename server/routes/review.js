import express from 'express'
import {
  createMovieReview,
  deleteMovieReview,
  getMovieReview,
} from '../controllers/reviewController.js'

const router = express.Router({ mergeParams: true });

router.route('/').get(getMovieReview)
router.route('/').post(createMovieReview)
router.route('/').delete(deleteMovieReview)

export default router;