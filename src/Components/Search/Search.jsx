import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Search.css'

const Search = () => {
    const [text, setText] = useState("");
    const [movies, setMovies] = useState([]);
    const [currPage, setCurrPage] = useState(1);
  const [hover, setHover] = useState("");
  const [parr, setParr] = useState([1]);
  const [favMov, setFavMov] = useState([]);

    const handleChange = (value) => {
        fetchData(value);
        setText(value)
    }

    const handleNext = () => {
        let tempArr = [];
        for (let i = 1; i <= parr.length + 1; i++) {
          tempArr.push(i);
        }
        setParr([...tempArr]);
        setCurrPage(()=>currPage + 1);
        fetchData();
      };
    
      const handlePrev = () => {
        if (currPage != 1) {
          setCurrPage(()=>currPage - 1);
          fetchData();
        }
      };
    
      const handlePageNum = (pageNum) => {
        setCurrPage(pageNum);
        fetchData();
      };

    const handleEnter = (id) => {
        setHover(id);
      };
    
      const handleLeave = () => {
        setHover("");
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

    const fetchData = async (value) => {
        let api = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${value}&page=${currPage}&include_adult=false`)
        setMovies([...api.data.results]);
        // console.log([...api.data.results])
    }
    
    const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";
    
  return (
    <div>
        <div className='search-div'>
        <input className='searchbox' type="text" name="" id="" placeholder='Search' onChange={(e)=>handleChange(e.target.value)} />
        <button className='search-btn' onClick={()=>handleChange(text)}><img src="https://t4.ftcdn.net/jpg/01/09/46/77/240_F_109467785_eeYWH2tY4CnkDl9BtuYO6hWjk7hH0okU.jpg" alt="" /></button>
        </div>
        {movies.length>0 && (
            <div className="list">
            <div className="movies-list">
              {movies.map((movie) => (
                <div
                  className="movie-card"
                  onMouseEnter={() => handleEnter(movie.id)}
                  onMouseLeave={handleLeave}
                >
                  <img
                    src={movie.backdrop_path == null ? unavailable : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className="banner-img"
                    alt="Image Not Available"
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
        )}
    </div>
  )
}

export default Search