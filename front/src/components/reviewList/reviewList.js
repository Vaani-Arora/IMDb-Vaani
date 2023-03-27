import React, {useEffect, useState} from "react"
import "./reviewList.css"
import axios from "axios";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { BASE_URL } from "../../Base_url";

const ReviewList = ({movieId}) => {
    const [reviewList, setReviewList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getData();
        setIsLoading(false);
    }, [movieId])

    const getData = async () => {
        // console.log("movieId - ", movieId)
        await axios
        .get(`${BASE_URL}/${movieId}/review`)
        .then((res) => {
            console.log("All reviews fetched - ", res.data.reviewList);
            setReviewList(res.data.reviewList);
        })
        .catch((e) => {
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
        });
    }

    return (
        isLoading
        ?
        <div className="cards">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
                <div className="spinner"></div>
            </SkeletonTheme>
        </div>
        :
        <>
        {
            reviewList.map(review => (
                <>
                    <div class="review-box">
                        <div class="review-box-header">
                            <p class="review-box-author">{review.createdAt.substring(0, 10)}</p>
                        </div>
                        <div class="review-box-body">
                            <p class="review-box-rating">{review.rating}/5</p>
                            <p class="review-box-text">{review.comment}</p>
                        </div>
                    </div>
                </>
            ))
        }
        </>
    )
}

export default ReviewList