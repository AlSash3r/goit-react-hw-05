import styles from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function MovieList({ movies, loading }) {
  const location = useLocation();
  const placeholderImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22300%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22200%22%20height%3D%22300%22%20style%3D%22fill%3Argba(200%2C200%2C200%2C0.5)%3Bstroke-width%3A2%3Bstroke%3Argba(100%2C100%2C100%2C0.5)%3Bstroke-dasharray%3A5%2C5%3B%22%20/%3E%3Ctext%20x%3D%2210%22%20y%3D%22150%22%20font-size%3D%2230%22%20fill%3D%22rgba(100%2C100%2C100%2C0.5)%22%3ENo%20Image%3C/text%3E%3C/svg%3E';

  if (loading) {
    return <p className={styles.loading}>Loading</p>;
  }

  return (
    <div className={styles.listContainer}>
      {movies.length > 0 && (
        <ul className={styles.list}>
          {movies.map(({ id, title, poster_path }) => (
            <li key={id} className={styles.item}>
              <Link
                state={{ from: location }}
                to={`/movies/${id}`}
                className={styles.link}
              >
                <img
                  src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : placeholderImage}
                  alt={title}
                  className={styles.image}
                />
                <div className={styles.title}>{title}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MovieList;
