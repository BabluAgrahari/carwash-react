import axios from "axios";

export default axios.create({
  // baseURL: "http://127.0.0.1:8000/api/",
  baseURL: "https://crm.quarainfotech.com/api/public/api/",
  headers: {
    // "Content-type": "application/json",
    "Accept": 'application/json',
    "ContentType": 'multipart/form-data'
  },
});
