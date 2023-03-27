import mongoose from 'mongoose'

 const reviewSchema = mongoose.Schema(
   {
     movieId: { type: Number, required: true },
     rating: { type: Number, required: true },
     comment: { type: Array,default:[], required: true },
     user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'MovieUser',
       },
    },
   {
     timestamps: true,
   }
 )
   const MovieReview= mongoose.model('MovieReview', reviewSchema)

   export default MovieReview;