import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MainMoviesPanel.css";

axios.defaults.withCredentials = true;

const MainMoviesPanel = ({ movies, onWatch, onAddToFavorites }) => {
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);
    
    const searchMovie = async () => {
        try {
          const response = await axios.get("http://localhost/get_movies");
          //console.log('API Response:', response.data); // Log API response
          if (response.data) {
            setResults(response.data);
          } else {
            setResults([]);
            setError('No results found.');
          }
          setError(null);
        } catch (err) {
          setError('Error fetching data. Please try again.');
          console.error(err);
        }
      };
      

      useEffect(() => {
        searchMovie();
      }, []); 

      useEffect(() => {
        if (results.length > 0) {
          console.log('Results:', results);
        }
      }, [results]);

  return (
    <div className="main-movies-panel">
      {/* Header Section */}
      <h2 className="movies-header">Movies</h2>

      {/* Movie Cards */}
      <div className="movies-cards">
            {results.length > 0 ? (
                results.map((movie) => (
                    <div key={movie.movieId} className="movie-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.posterPath || 'default-poster.jpg'}`}
                            alt={movie.title}
                            className="movie-poster1"
                        />
                        <div className="movie-details">
                            <h3 className="movie-title">{movie.title}</h3>
                            <p className="movie-description">{movie.overview}</p>
                            <button
                                className="watch-button"
                                onClick={() => onWatch(movie.movieId)}
                            >
                                Watch
                            </button>
                            <button
                                className="watch-button"
                                onClick={() => onAddToFavorites(movie)}
                            >
                                Add to Favorites
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No movies available.</p>
            )}
        </div>
    </div>
  );
};

export default MainMoviesPanel;