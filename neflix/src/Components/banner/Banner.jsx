import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { API_KEY } from "../../constants/constants";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    console.log("Banner mounted");

    const fetchData = async () => {
      try {
        const url = `/trending/all/week?api_key=${API_KEY}&language=en-US`;
        console.log("➡️ Request URL:", url);

        const response = await axios.get(url);
        console.log("✅ API Response:", response.data);

        const movies = response.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      } catch (err) {
        console.error("❌ Axios Error:", err);
      }
    };

    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner h-[450px] text-white flex flex-col justify-end p-8"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie
          ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
          : "none",
        backgroundPosition: "center center",
      }}
    >
      <h1 className="text-4xl font-bold">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-md mt-4 text-gray-200">
        {truncate(movie?.overview, 150)}
      </p>
    </header>
  );
}

export default Banner;



