import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;


const fetchMovies = async (searchTerm: string) => {
  if (!searchTerm) return [];
  const { data } = await axios.get(
    `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
  );
  return data.Search || [];
};

const SearchMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ["movies", searchTerm],
    queryFn: () => fetchMovies(searchTerm),
    enabled: !!searchTerm,
  });

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for a movie..."
        className="border p-2 rounded"
        defaultValue={searchTerm}
        onChange={(e) => setSearchParams({ query: e.target.value })}
      />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching movies.</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {movies?.map((movie: any) => (
          <div key={movie.imdbID} className="border p-2 rounded">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
            <h3 className="mt-2">{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
