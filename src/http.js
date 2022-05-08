import axios from "axios";
const userData = JSON.parse(sessionStorage.getItem("userData"));
var token = '';
if(userData){
var token = userData.token;
}

export default axios.create({
  // baseURL: "http://127.0.0.1:8000/api/",
  baseURL:"https://crm.quarainfotech.com/api/public/api/",
  headers: {
    // "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
    "Accept": 'application/json',
    "ContentType": 'multipart/form-data'
  },
});
