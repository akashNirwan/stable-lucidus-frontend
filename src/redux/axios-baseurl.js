import axios from "axios";
const BASE_URL= import.meta.env.VITE_baseURL_KEY;




 const client = axios.create(
  {
    
    baseURL: BASE_URL,

  },
  {
    withCredentials: true,
  }
);


export default client;