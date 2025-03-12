import styles from './MovieDetailsPage.module.css';
import { Suspense, useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails } from "../../components/ApiService/Api";
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loader/Loader';
import BackButton from '../../components/BackButton/BackButton';

function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('ua-UA', options);
}

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    async function fetchMovieById() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieById();
  }, [movieId]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return movie ? (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <BackButton backPath={backLinkRef.current} />
      </div>
      <div className={styles.details}>
        {movie.backdrop_path ? (
          <img
            className={styles.poster}
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.original_title || 'Movie Poster'}
          />
        ) : (
          <img
            className={styles.poster}
            src="https://dummyimage.com/500x750/cccccc/000000&text=No+Image"
            alt="No Image Available"
          />
        )}
        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title}</h1>
          {movie.release_date && <p className={styles.userScore}>({formatDate(movie.release_date)})</p>}
          <p className={styles.overview}>{movie.overview}</p>
          <ul className={styles.genres}>
            {movie.genres.map((genre) => (
              <li key={genre.id} className={styles.genre}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.links}>
        <NavLink className={styles.link} to={`/movies/${movieId}/cast`}>
          Cast
        </NavLink>
        <NavLink className={styles.link} to={`/movies/${movieId}/reviews`}>
          Reviews
        </NavLink>
      </div>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  ) : (
    <p>Not found</p>
  );
}

export default MovieDetailsPage;
