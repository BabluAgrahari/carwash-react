import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

const navigate = useNavigate();

useEffect(()=>{
  if(localStorage.getItem('userData')){
   navigate('/dashboard');
  }
})

var url = 'http://127.0.0.1:8000/api/login';
// var url = 'http://www.theserv.in/crm3/public/api/login';
  async function login(){
    console.warn("data",email,password);
    let item ={email,password}
    let result = await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(item)
    });
    result = await result.json();
    localStorage.setItem('userData',JSON.stringify({
      'login':true,
      'user':result.user,
      'token':result.access_token
    }));
   navigate('/dashboard');
  }
  return (
    <div className="hold-transition login-page">
      <div class="login-box">
        <div class="login-logo">
          <a href="">
           <img src="http://www.theserv.in/assets/images/logo/logo.png" style={{width:"145px"}}></img>
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
{/*
            <form action="../../index3.html" method="post"> */}
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="button" onClick={login} className="btn btn-block sign-in">
                    Sign In
                  </button>
                </div>
              </div>
            {/* </form> */}

            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            {/* <p className="mb-0">
              <a href="register.html" className="text-center">
                Register a new membership
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
