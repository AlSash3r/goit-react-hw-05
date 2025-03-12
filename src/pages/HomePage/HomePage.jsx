import styles from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from "../../components/ApiService/Api";
import MovieList from '../../components/MovieList/MovieList';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loader/Loader';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchTrendingMoviesData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const { results, totalPages } = await fetchTrendingMovies(page);
        setMovies((prevMovies) => {
          const movieIds = new Set(prevMovies.map((movie) => movie.id));
          const newMovies = results.filter(
            (movie) => !movieIds.has(movie.id)
          );
          return [...prevMovies, ...newMovies];
        });
        setTotalPages(totalPages);
      } catch (error) {
        setIsError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrendingMoviesData();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trending today</h2>
      {isError && <ErrorMessage />}
      {isLoading && <Loading />}
      <div className={styles.movieList}>
        <MovieList movies={movies} />
      </div>
      {movies.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}
