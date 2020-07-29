import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
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
      <h2>Login</h2>
      {error && (
    <ErrorNotice message={error} clearError={() => setError(undefined)} /> 
  )}
      <form className="register-form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <div className="submitContainer col s12">
          <input type="submit" className="waves-effect waves-light btn-large" value="Submit" />
        </div>
      </form>
    </div>
  )
}
