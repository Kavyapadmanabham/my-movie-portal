import React, { useState, useEffect, useRef } from 'react';

function Banner({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recentMovies, setRecentMovies] = useState([]);
  const savedRecentMovies = useRef([]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      // Sort movies by release_date or added_date descending (latest first)
      // Assuming 'release_date' exists and is in YYYY-MM-DD format
      const sortedByDate = [...movies].sort((a, b) => {
        // If date is missing, put those movies last
        if (!a.release_date) return 1;
        if (!b.release_date) return -1;
        return new Date(b.release_date) - new Date(a.release_date);
      });

      const top3Recent = sortedByDate.slice(0, 3);
      setRecentMovies(top3Recent);
      savedRecentMovies.current = top3Recent; // Save for fallback
      setCurrentIndex(0);
    } else if (savedRecentMovies.current.length > 0) {
      // Use previous top recent movies if current list empty
      setRecentMovies(savedRecentMovies.current);
    }
  }, [movies]);

  useEffect(() => {
    if (recentMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentMovies.length);
    }, 5000); // Cycle every 5 seconds

    return () => clearInterval(interval);
  }, [recentMovies]);

  if (recentMovies.length === 0) {
    return (
      <div
        className="h-[20vh] md:h-[75vh] bg-contain bg-center flex items-end bg-gray-800"
        style={{
          backgroundImage: `url(https://wallpapers.com/images/hd/black-prabhas-salaar-lo8uwioz9si6zfrf.jpg)`,
        }}
      >
        <div className="text-white text-2xl text-center w-full bg-blue-900/60 p-4">
          SALAAR
        </div>
      </div>
    );
  }

  const movie = recentMovies[currentIndex];
  const backgroundUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`;

  return (
    <div
      className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end transition-all duration-700"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="text-white text-2xl text-center w-full bg-blue-900/60 p-4">
        {movie.original_title || movie.title}
      </div>
    </div>
  );
}

export default Banner;
