import axios from "axios";

var userData = JSON.parse(localStorage.getItem("userData"));
if(userData){
var token = userData.token;
console.log(userData.token);
}

export default axios.create({
  // baseURL: "http://127.0.0.1:8000/api/",
  baseURL:"http://www.theserv.in/crm3/public/api/",
  headers: {
    // "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
    "Accept": 'application/json',
    "ContentType": 'multipart/form-data'
  },
});
