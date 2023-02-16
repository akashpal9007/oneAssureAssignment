import React, { useEffect, useState } from "react";
import "./Favourites.css";

const Favourites = () => {
  const [movies, setMovies] = useState([]);

  const handleDelete = (id) => {
    let newMovies = movies.filter((movieObj) => {
      return movieObj.id != id;
    });
      setMovies([...newMovies])
    localStorage.setItem("movies", JSON.stringify(newMovies));

  }

  let genreId = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  let genreArr = [];
  useEffect(() => {
    let results = JSON.parse(localStorage.getItem("movies"));
    results.map((movieObj) => {
      if (!genreArr.includes(genreId[movieObj.genre_ids[0]])) {
        genreArr.push(genreId[movieObj.genre_ids[0]]);
      }
    });
    setMovies(results);
  }, []);

  return (
    <div class="fav">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col" className="genre">Genre</th>
            <th scope="col" className="popularity">Popularity</th>
            <th scope="col" className="rating">Rating</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tr>
          <td colspan="5">
            <hr />
          </td>
        </tr>
        <tbody>
          {movies.map((movieObj) => (
            <>
              <tr>
                <td
                  scope="row"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    style={{ width: "8rem" }}
                  />
                  {movieObj.original_title}
                </td>
                <td className="genre">{genreId[movieObj.genre_ids[0]]}</td>
                <td className="popularity">{movieObj.popularity}</td>
                <td className="rating">{movieObj.vote_average}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDelete(movieObj.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <hr />
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favourites;
