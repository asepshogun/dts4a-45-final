import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    'api_key' : "4ffdc93bfb98c161684b80a8b544d23b",
  }
});

// Karena nanti akan digunakan di tempat lain
// maka kita harus export
export default tmdb;
