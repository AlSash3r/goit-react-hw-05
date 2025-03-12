import styles from './MovieCast.module.css';
import { useEffect, useState } from 'react';
import { fetchMovieCast } from "../../components/ApiService/Api";
import { useParams } from 'react-router-dom';

function MovieCast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCast() {
      setIsLoading(true);
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  if (isLoading) {
    return <p className={styles.loading}>Loading</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Actors</h2>
      {cast.length > 0 ? (
        <ul className={styles.list}>
          {cast.map((actor) => (
            <li key={actor.id} className={styles.item}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : `https://ui-avatars.com/api/?name=${actor.name.replace(' ', '+')}&background=random&length=1`
                }
                alt={actor.name}
                className={styles.image}
              />
              <h3 className={styles.name}>{actor.name}</h3>
              <p className={styles.character}>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noActors}>No Actors</p>
      )}
    </div>
  );
}

export default MovieCast;
