import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { API_KEY } from "../../constants/constants";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState(null); // Top banner movie
  const [movies, setMovies] = useState([]); // Trending movies grid

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/trending/all/week?api_key=${API_KEY}&language=en-US`;
        const response = await axios.get(url);
        const results = response.data.results;

        // Random movie for banner
        const randomMovie = results[Math.floor(Math.random() * results.length)];
        setMovie(randomMovie);

        // All movies for grid
        setMovies(results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="banner-page flex flex-col bg-gray-900">
      {/* Top Banner */}
      <header
        className="relative text-white flex flex-col justify-end h-[500px] md:h-[600px] p-8"
        style={{
          backgroundSize: "cover",
          backgroundImage: movie
            ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
            : "none",
          backgroundPosition: "center center",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0"></div>

        {/* Content */}
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <p className="text-gray-200 mb-4">{truncate(movie?.overview, 150)}</p>
          <div className="flex space-x-4">
            <button className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-300 transition">
              Play
            </button>
            <button className="bg-gray-700 bg-opacity-70 text-white font-semibold px-4 py-2 rounded hover:bg-gray-600 transition">
              My List
            </button>
          </div>
        </div>
      </header>

      {/* Divider */}
      <hr className="border-t-2 border-gray-700 my-6" />

      <div className="px-8 pb-12 max-w-screen-xl mx-auto">
        <h2 className="text-white text-2xl mb-6 font-bold">Trending Movies</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                    : "https://via.placeholder.com/500x281?text=No+Image"
                }
                alt={movie.title || movie.name || movie.original_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                loading="lazy"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg">
                  {movie.title || movie.name || movie.original_name}
                </h3>
                <p className="text-gray-200 text-sm mt-1">
                  {truncate(movie.overview, 100)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
