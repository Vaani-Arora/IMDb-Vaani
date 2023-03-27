import React, { useState, useEffect } from "react";
import StarRating from "../starRating/starRating";
import axios from "axios";
import "./review.css";
import { BASE_URL } from "../../Base_url";
import Cookies from "js-cookie";

const Review = ({movieId}) => {
    const [review, setReview] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');

    const handleDelete = () => {
     const token = Cookies.get("token");
      axios.delete(`${BASE_URL}/${movieId}/review`,{token}, { withCredentials: true })
        .then(res => {
          console.log("response - ", res);
        })
        .catch ( (e) => {
          console.log(e);
          if (e.response) {
            if (e.response.status === 404) {
              alert(e.response.data.msg);
            } else {
              alert("Got incorrect response code from the server.");
            }
          } else {
            alert("Got incorrect response from the server.");
          }
        })
    };

    async function submit(e){
      e.preventDefault();
	    const token = Cookies.get("token");
      axios.post(`${BASE_URL}/${movieId}/review`, { rating, comment,token }, { withCredentials: true })
        .then(res => {
          console.log("response - ", res);
        })
        .catch ( (e) => {
          console.log(e);
          if (e.response) {
            if (e.response.status === 401 || e.response.status === 404) {
              alert(e.response.data.msg);
            } else {
              alert("Got incorrect response code from the server.");
            }
          } else {
            alert("Got incorrect response from the server.");
          }
        })
		}

    return (
    <>
    <div className="user-rev">
      <div className="rev">
      <h1>Reviews</h1>
      <StarRating setRatingValue={setRating}/>
      <label className="comm">Comments:</label>
      <textarea className="comm-text" value={comment} onChange={event => setComment(event.target.value)}></textarea>
      <input className="comm-button" type="submit" onClick={submit}/>
      <button className="comm-button" onClick={() => handleDelete(comment._id)}>Delete</button>
      <br></br>
      </div>
     </div>
     </>
)}

export default Review;
