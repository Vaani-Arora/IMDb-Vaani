import React from "react"
import { Link } from "react-router-dom";
import {FaStar} from "react-icons/fa";

const Slides = ({movie}) => {

    return <>
    {
        <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
            <div className="posterImage">
                <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt="" />
            </div>
            <div className="posterImage__overlay">
                <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                <div className="posterImage__runtime">
                    {movie ? movie.release_date : ""}
                    <span className="posterImage__rating">
                        {movie ? movie.vote_average :""}
                        <FaStar/> {" "}
                    </span>
                </div>
                <div className="posterImage__description">{movie ? movie.overview : ""}</div>
            </div>
        </Link>
    }
    </>
}

export default Slides