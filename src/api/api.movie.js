import axios from "axios";

let omdbKey;

if (process.env.NODE_ENV !== "production") {
  omdbKey = process.env.REACT_APP_OMDB_KEY;
} else {
  omdbKey = process.env.OMDB_KEY;
}

export const getMovieById = async id => {
  // Example: http://www.omdbapi.com/?i=tt3896198&apikey=dce24c91
  const {data} = await axios.get(
    `https://www.omdbapi.com/?i=${id}&apikey=${omdbKey}&plot=full`
  );
  if (data.Error) {
    return null;
  }
  return data;
};

export const searchMovies = async text => {
  // Example: http://www.omdbapi.com/?s=guardians&apikey=dce24c91
  const {data} = await axios.get(
    `https://www.omdbapi.com/?s=${text}&apikey=${omdbKey}`
  );
  if (data.Error) {
    return [];
  }
  return data.Search;
};
