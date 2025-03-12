import styles from './MoviesPage.module.css';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from "../../components/ApiService/Api";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const q = searchParams.get('q') || '';

  useEffect(() => {
    setQuery('');
  }, []);

  useEffect(() => {
    if (q) {
      setLoading(true);
      setError(null);
      searchMovies(q)
        .then((results) => {
          setMovies(results);
          if (results.length === 0) {
            setError('Sorry! No movies found. Try to find something else again!');
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
    setQuery(''); 
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies"
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {error && <p className={styles.error}>Error: {error}</p>}
      {loading && <p className={styles.loading}>Loading</p>}
      <div className={styles.movieList}>
        <MovieList movies={movies} loading={loading} />
      </div>
    </div>
  );
}

export default MoviesPage;
