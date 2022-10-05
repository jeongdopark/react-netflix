import axios from '../../api/axios';
import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchPage.css';
export default function SearchPage() {
    const navigate = useNavigate();
    const [searchResults, setsearchResults] = useState([]);

    const useQuery = () => {    
        return new URLSearchParams(useLocation().search);
        }

    let query = useQuery();
    const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    
    useEffect(() => {
        if(debouncedSearchTerm){
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm])

    const fetchSearchMovie = async (debouncedSearchTerm) => {
        try{
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${debouncedSearchTerm}`
            )
            setsearchResults(request.data.results);
        }catch(error){
            console.log("error");
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className="search-container">
                {searchResults.map((movie) => {
                    if(movie.backdrop_path !== null && movie.media_type !== "person"){
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                        return(
                            <div className="movie">
                                <div 
                                    onClick={() => navigate(`/${movie.id}`)}
                                    className="movie__column-poster">
                                    <img src={movieImageUrl} alt="123" className="movie__poster"/>
                                </div>
                            </div>
                        )
                    }
                })}
            </section>
        ) : (
            <section className="no-results">
                <div className="no-results__text">
                    <p style={{color:"black"}}>찾고자 하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다</p>
                </div>
            </section>
        );
    };
    
  return renderSearchResults();
}
