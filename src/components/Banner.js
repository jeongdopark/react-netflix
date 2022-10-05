import React, { useState, useEffect } from 'react';
import './Banner.css';
import axios from '../api/axios';
import requests from '../api/request';
const Banner = () => {
    const [movie, setMovie] = useState([]); // 영화가 들어갈 useState
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => { 
        // 현재 상영 중인 영화 가져오기
        const request = await axios.get(requests.fetchNowPlaying);
        const moviesDataArray = request.data.results;
        const movieId = moviesDataArray[Math.floor(Math.random() * moviesDataArray.length)].id
        const { data : movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response : "videos" },
        });
        setMovie(movieDetail)
    };

    const truncate = (str, n) => {
        return str?.length > n ? `${str.substr(0, n) + '...'}` : str;
    }
    
    return( 
        <div className="banner-wrapper" style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`, backgroundPosition:"top center", backgroundSize : "cover"}}>
            <div className="banner-contents">
                <h1 className="banner-title">{movie.title || movie.original_title}</h1>
                <div className="banner-button-container">
                    <button className="play-btn">Play</button>
                    <button className="info-btn">More Information</button>
                </div>
                <p className="banner-info">{truncate(movie?.overview, 100)}</p>
            </div>
        </div>
    )
}

export default Banner;