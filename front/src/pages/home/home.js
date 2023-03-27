import React, { useEffect, useState } from "react"
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import MovieList from "../../components/movieList/movieList";
import Slides from "../../components/slides/slides"

const Home = () => {

    const [ popularMovies, setPopularMovies ] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])

    return (
        <>
            <div className="poster">
            { popularMovies.length > 0 && (
            <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={500}
                    interval={4000}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {popularMovies.map(movie => (
                        <Slides key={movie.id} movie={movie} />
                    ))}
                </Carousel>
            )}
                <MovieList />
            </div>
        </>
    )
}

export default Home