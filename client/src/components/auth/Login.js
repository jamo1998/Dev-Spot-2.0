import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from '../misc/ErrorNotice';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = {
        email,
        password,
      };
      const loginRes = await Axios.post("http://localhost:5000/users/login", loginUser);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
    
  };

  return (
    <div className="container loginContainer">
      <h4>Login:</h4>
      <br /> 

      {error && (
    <ErrorNotice message={error} clearError={() => setError(undefined)} /> 
  )}
      <form className="register-form" onSubmit={submit}>
        <div className="input-field">
       
          <input
            id="login-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
           <label htmlFor="login-email" className="black-text">Email</label>
        </div>
        
        <div className="input-field">
          <input
            id="login-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="login-password" className="black-text">Password</label>
        </div>
        <Link to='/register' className="right">Don't have an account? Register here!</Link>
        <br/>
        <br />
        <div className="submitContainer col s12">
          <input type="submit" className="waves-effect waves-light btn-large" value="Login" />
        </div>
      </form>
    </div>
  )
}
