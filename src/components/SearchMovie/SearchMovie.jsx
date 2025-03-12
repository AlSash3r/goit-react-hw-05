import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import s from "./SearchMovie.module.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SearchMovie({ onSearch }) {
  const notify = () => toast.error("Error loading!");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.get('q')) {
      document.querySelector(`.${s.input}`).value = '';
    }
  }, [location]);

  return (
    <Formik
      initialValues={{ movie: "" }}
      onSubmit={(values, actions) => {
        if (!values.movie.trim()) {
          return notify();
        }
        onSearch(values.movie);
        actions.resetForm();
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('q', values.movie);
        window.history.replaceState(null, "", `?${searchParams.toString()}`);
      }}
    >
      <Form className={s.search}>
        <Field
          className={s.input}
          type="text"
          name="movie"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
}

SearchMovie.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
