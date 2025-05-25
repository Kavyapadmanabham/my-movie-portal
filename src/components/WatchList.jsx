import React, { useEffect, useState } from 'react';
import genreids from '../Utility/genre';

function WatchList({ watchlist, setWatchList, handleRemoveFromWatchList }) {
  const [search, setSearch] = useState('');
  const [genreList, setGenreList] = useState(['All Genres']);
  const [currGenre, setCurrGenre] = useState('All Genres');
  const [sortOrder, setSortOrder] = useState(null); 

  useEffect(() => {
    let genres = watchlist.map((movieObj) => genreids[movieObj.genre_ids[0]]);
    genres = new Set(genres);
    setGenreList(['All Genres', ...genres]);
  }, [watchlist]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  const sortIncreasing = () => {
    setSortOrder('asc');
  };

  const sortDecreasing = () => {
    setSortOrder('desc');
  };

  
  let filteredList = watchlist
    .filter((movieObj) => {
      if (currGenre === 'All Genres') return true;
      return genreids[movieObj.genre_ids[0]] === currGenre;
    })
    .filter((movieObj) => {
      const searchTerm = search.trim().toLowerCase();
      return (
        (movieObj.title && movieObj.title.toLowerCase().includes(searchTerm)) ||
        (movieObj.original_title && movieObj.original_title.toLowerCase().includes(searchTerm))
      );
    });

  if (sortOrder === 'asc') {
    filteredList = [...filteredList].sort(
      (a, b) => a.vote_average - b.vote_average
    );
  } else if (sortOrder === 'desc') {
    filteredList = [...filteredList].sort(
      (a, b) => b.vote_average - a.vote_average
    );
  }

  return (
    <>
      <div className="flex justify-center flex-wrap m-4 hover:cursor-pointer">
        {genreList.map((genre) => (
          <div
            key={genre}
            onClick={() => handleFilter(genre)}
            className={
              currGenre === genre
                ? 'flex justify-center items-center h-[3rem] w-[9rem] bg-blue-200 rounded-xl text-white font-bold mx-4 '
                : 'flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/40 rounded-xl text-white font-bold mx-4 '
            }
          >
            {genre}
          </div>
        ))}
      </div>

      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search in your WatchList"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none p-4 rounded"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                <div
                  onClick={sortIncreasing}
                  className="p-2 cursor-pointer select-none"
                >
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Rating</div>
                <div
                  onClick={sortDecreasing}
                  className="p-2 cursor-pointer select-none"
                >
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>

              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredList.map((movieObj) => (
              <tr key={movieObj.id} className="border-b-2">
                <td className="flex items-center px-6 py-4">
                  <img
                    className="h-[6rem] w-[10rem]"
                    src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                    alt={movieObj.title}
                  />
                  <div className="mx-10">{movieObj.title}</div>
                </td>
                <td>{movieObj.vote_average}</td>
                <td>{movieObj.popularity}</td>
                <td>{genreids[movieObj.genre_ids[0]]}</td>

                <td
                  onClick={() => handleRemoveFromWatchList(movieObj)}
                  className="text-red-800 hover:cursor-pointer"
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
