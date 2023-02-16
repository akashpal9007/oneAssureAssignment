import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./List.css";

const List = () => {
  const [movies, setMovies] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [hover, setHover] = useState("");
  const [parr, setParr] = useState([1]);
  const [favMov, setFavMov] = useState([]);

  const changeMovies = async () => {
    let api = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=d7204b16fafe2c96fd50a94e899c9a6e&language=en-US&page=${currPage}`
    );
    setMovies([...api.data.results]);
    console.log(movies);
  };

  const handleEnter = (id) => {
    setHover(id);
  };

  const handleLeave = () => {
    setHover("");
  };

  const handleNext = () => {
    let tempArr = [];
    for (let i = 1; i <= parr.length + 1; i++) {
      tempArr.push(i);
    }
    setParr([...tempArr]);
    setCurrPage(()=>currPage + 1);
  };

  const handlePrev = () => {
    if (currPage != 1) {
      setCurrPage(()=>currPage - 1);
    }
  };

  const handlePageNum = (pageNum) => {
    setCurrPage(pageNum);
  };

  const handleFavourites = (movieObj) => {
    let localStorageMovies = JSON.parse(localStorage.getItem("movies")) || [];
   
    if (favMov.includes(movieObj.id)) {
      localStorageMovies = localStorageMovies.filter(
        (movie) => movie.id != movieObj.id
      );
    }
    else localStorageMovies.push(movieObj);
    
    localStorage.setItem("movies", JSON.stringify(localStorageMovies));

    let tempData = localStorageMovies.map(movieObj => movieObj.id);
      setFavMov([...tempData])
  }
  useEffect(() => {
    changeMovies();
  }, [currPage]);

  return (
    <div className="list">
      <div className="movies-list">
        {movies.map((movie) => (
          <div
            className="movie-card"
            onMouseEnter={() => handleEnter(movie.id)}
            onMouseLeave={handleLeave}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              className="banner-img"
              alt="..."
              style={{ height: "40vh" }}
            />
            <h5 className="card-title movie-title">{movie.original_title}</h5>
            <div className="button-wrapper">
              {hover == movie.id && (
                <button
                  className="movie-button"
                     onClick={() => handleFavourites(movie)}
                >
                  {favMov.includes(movie.id)?"Remove from Favourites":"Add to Favourites"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className="page-link prev-button" onClick={handlePrev}>
          Previous
        </button>
        {parr.map((pageNum) => (
          <button
            className="page-link curr-button"
            onClick={() => {
              handlePageNum(pageNum);
            }}
          >
            {pageNum}
          </button>
        ))}
        <button className="page-link next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default List;
