import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = ({ watchlist, handleAddtoWatchList, handleRemoveFromWatchList }) => {
  const query = useQuery();
  const searchTerm = query.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: "YOUR API_KEY", 
          query: searchTerm,
        },
      })
      .then((res) => {
        setResults(res.data.results || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Search results for: "{searchTerm}"
      </h2>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-white">No results found.</p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              movieObj={movie}
              poster_path={movie.poster_path}
              name={movie.title}
              handleAddtoWatchList={handleAddtoWatchList}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              watchlist={watchlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
