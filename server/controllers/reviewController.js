import asyncHandler from 'express-async-handler'
import MovieReview from "../models/MovieReview.js";
import jwt from "jsonwebtoken";

const createMovieReview = asyncHandler(async (req, res) => {
  console.log("Incoming request params - ", req.params.id)
  console.log("Incoming request body - ", req.body)
  console.log("Incoming request token - ", req.cookies.token)
  const requestMovieId = req.params.id;
  const userToken = req.cookies.token;
  try {
    const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    // console.log(userId);
    const { rating, comment } = req.body

    const alreadyReviewed = await MovieReview.find({ movieId: requestMovieId, user: userId } );

    console.log("AlreadyReviewed? - ", alreadyReviewed)

    if (alreadyReviewed.length > 0) {
      return res.status(401).json({ msg: "Movie already reviewed." });
    }

    const review = new MovieReview({
      movieId: requestMovieId,
      rating: Number(rating),
      comment,
      user: userId,
    });

    const savedReview = await review.save();
    console.log("Got savedReview - ", savedReview);

    // movie.numReviews = movie.review.length

    // movie.rating =
    //   movie.review.reduce((acc, item) => item.rating + acc, 0) /
    //   movie.review.length

    // await movie.save()
    res.status(201).json({ message: 'Review succesfully added!' })


  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "User not logged in." });
  }
})


const getMovieReview = asyncHandler(async (req, res) => {
  console.log("Incoming request - ", req.params.id)
  const requestMovieId = req.params.id;

  const reviewList = await MovieReview.find({ movieId: requestMovieId } );
  console.log("Found the following reviews: ", reviewList);
  res.status(201).json({ reviewList: reviewList })
})


const deleteMovieReview = asyncHandler(async (req, res) => {
  console.log("Incoming request params - ", req.params.id)
  console.log("Incoming request token - ", req.cookies.token)
  const requestMovieId = req.params.id;
  const userToken = req.cookies.token;

  try {
    const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    // console.log(userId);

    const deleted = await MovieReview.findOneAndDelete({ movieId: requestMovieId, user: userId } );
    console.log("Deleted? - ", deleted)

    if (deleted) {
      return res.status(201).json({ message: 'Review succesfully added!' })
    }

    return res.status(404).json({ msg: "Review doesn't exist" });

  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ msg: "User not logged in." });
  }
});

export { createMovieReview, deleteMovieReview, getMovieReview }