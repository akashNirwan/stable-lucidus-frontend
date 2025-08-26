import axios from "axios";
const BASE_URL= import.meta.env.VITE_baseURL_KEY;

console.log(BASE_URL, "BASE_URL");


 const client = axios.create(
  {
    
    baseURL: BASE_URL,

  },
  {
    withCredentials: true,
  }
);


export default client;