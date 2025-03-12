import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoArrowBack } from 'react-icons/io5';
import styles from './BackButton.module.css';

function BackButton({ backPath }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => navigate(backPath)}>
        <IoArrowBack className={styles.icon} /> {}
       Back
      </button>
    </div>
  );
}

BackButton.propTypes = {
  backPath: PropTypes.string.isRequired,
};

export default BackButton;
