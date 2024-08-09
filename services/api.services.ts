import axios from "axios";

const URL_BASE = "https://pokeapi.co/api/v2";

const api = axios.create({
  baseURL: URL_BASE,
});

export default api;
