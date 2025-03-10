import axios from "axios";



const fetchMovies = async (searchTerm: string) => {
  if (!searchTerm) return [];
  const { data } = await axios.get(
    `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
  );
  return data.Search || [];
};