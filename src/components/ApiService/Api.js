import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTU4ZDdiMDhlMzM2MGE3NTdjMmU4MzhmOTQ1YTUyYyIsIm5iZiI6MTczOTI3NDc1Ni44MTksInN1YiI6IjY3YWIzYTA0OWQzNDZkM2VmNDliYWFjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._1YTPFUpdXr05QCXwTjVZOz_7TZoecDw9ywnj4g_21w";
const API_URL = "https://api.themoviedb.org/3";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

const handleErrors = (error) => {
  console.error("API call failed: ", error);
  throw error;
};

const cache = {};

const getCachedData = (key) => cache[key];
const setCachedData = (key, data) => {
  cache[key] = data;
};

export async function fetchTrendingMovies(page = 1) {
  const cacheKey = `trendingMovies_${page}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axiosInstance.get("/trending/movie/day", {
      params: { page },
    });
    const { results, total_pages } = response.data;
    const data = { results, totalPages: total_pages };
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    handleErrors(error);
  }
}

export async function searchMovies(query) {
  const cacheKey = `searchMovies_${query}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axiosInstance.get("/search/movie", {
      params: { query },
    });
    const results = response.data.results;
    setCachedData(cacheKey, results);
    return results;
  } catch (error) {
    handleErrors(error);
  }
}

export async function fetchMovieDetails(movieId) {
  const cacheKey = `movieDetails_${movieId}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    const result = response.data;
    setCachedData(cacheKey, result);
    return result;
  } catch (error) {
    handleErrors(error);
  }
}

export async function fetchMovieCast(movieId) {
  const cacheKey = `movieCast_${movieId}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axiosInstance.get(`/movie/${movieId}/credits`);
    const result = response.data.cast;
    setCachedData(cacheKey, result);
    return result;
  } catch (error) {
    handleErrors(error);
  }
}

export async function fetchMovieReviews(movieId) {
  const cacheKey = `movieReviews_${movieId}`;
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
    const results = response.data.results;
    setCachedData(cacheKey, results);
    return results;
  } catch (error) {
    handleErrors(error);
  }
}
