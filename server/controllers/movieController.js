import asyncHandler from 'express-async-handler'
import Movielist from '../models/MovieList.js'
import MovieReview from "../models/MovieReview.js";

 const getMovies = asyncHandler(async (req, res) => {
   const movies = await Movielist.find({})
   res.json(movies)
 })

 const getMovieById = asyncHandler(async (req, res) => {
   const movie = await Movielist.findById(req.params.id)

   if (movie) {
     res.json(movie)
   } else {
     res.status(404)
     throw new Error('Movie not found')
   }
 })

 export { getMovies, getMovieById }