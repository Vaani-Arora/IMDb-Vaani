import React from "react";
import "./header.css";
import {Link} from "react-router-dom";
import {FaUserAlt} from "react-icons/fa";

const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="" /></Link>
            </div>
            <div className="headerRight">
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
                <Link to="/login" style={{textDecoration: "none"}}><span><FaUserAlt className="loginButton"/></span></Link>
            </div>
        </div>
    )
}

export default Header