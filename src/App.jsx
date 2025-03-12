import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const MovieReviews = lazy(() => import("./components/MovieReviews/MovieReviews"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const ErrorMessage = lazy(() => import("./components/ErrorMessage/ErrorMessage"));
const Loader = lazy(() => import("./components/Loader/Loader"));
const LoadMoreBtn = lazy(() => import("./components/LoadMoreBtn/LoadMoreBtn"));
const MovieList = lazy(() => import("./components/MovieList/MovieList"));
const SearchMovie = lazy(() => import("./components/SearchMovie/SearchMovie"));

import "./App.css";

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
