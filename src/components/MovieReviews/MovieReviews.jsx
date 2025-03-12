import styles from './MovieReviews.module.css';
import { useEffect, useState } from 'react';
import { fetchMovieReviews } from "../../components/ApiService/Api";
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getReviews() {
      setIsLoading(true);
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);
  if (isLoading) {
    return <p className={styles.loading}>Loading</p>;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.item}>
              <h3 className={styles.author}>{review.author}</h3>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noReviews}>No Reviews</p>
      )}
    </div>
  );
}
MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default MovieReviews;
