import styles from './MoviesPage.module.css';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMovies } from "../../components/ApiService/Api";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const q = searchParams.get('q') || '';
  const navigate = useNavigate();

  useEffect(() => {
    setQuery('');
  }, []);

  useEffect(() => {
    if (q) {
      setLoading(true);
      searchMovies(q)
        .then((results) => {
          if (results.length === 0) {
            navigate('/not-found'); 
          } else {
            setMovies(results);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [q, navigate]);

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
      {loading && <p className={styles.loading}>Loading</p>}
      {movies.length > 0 && (
        <div className={styles.movieList}>
          <MovieList movies={movies} loading={loading} />
        </div>
      )}
    </div>
  );
}

export default MoviesPage;
