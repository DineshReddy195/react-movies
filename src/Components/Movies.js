import React, { useState } from "react";

function Movies() {
  const [Searching, setSearching] = useState(false);
  const [message, setmessage] = useState(null);
  const [query, setquery] = useState("");
  const [movies, setmovies] = useState([]);

  const movieSearch = async (e) => {
    e.preventDefault();
    setSearching(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=bf19413a`
      );
      const data = await response.json();
      setmessage(null);
      setmovies(data.Search);
      setSearching(false);
    } catch (err) {
      setmessage("Error whatever");
      setSearching(false);
    }
  };

  return (
    <div className="main">
      <div className="searchbox">
        <form onSubmit={movieSearch}>
          <input
            type="text"
            placeholder="Search movies"
            value={query}
            onChange={(e) => setquery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <p className="headingtag">Sharing a few of our favourite movies</p>
      </div>

      <div className="result">
        {Searching && !message ? (
          <span> loading... </span>
        ) : message ? (
          <div className="message"> {message} </div>
        ) : (
          movies.map((movie) => (
            <div className="movie-main">
              <div className="movie" key={movie.imdbID}>
                <p className="title">{movie.Title}</p>
                <img className="image" src={movie.Poster} alt={movie.Title} />
                <div>
                  <p>({movie.Year})</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Movies;
