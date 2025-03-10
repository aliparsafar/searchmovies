import { Routes, Route } from "react-router-dom";
import SearchMovies from "./components/searchmovies";

function App() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">Movie Search</h1>
      <Routes>
        <Route path="/" element={<SearchMovies />} />
      </Routes>
    </div>
  );
}

export default App;


