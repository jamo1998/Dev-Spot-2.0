import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from '../misc/ErrorNotice';
import M from 'materialize-css';

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const [githubURL, setGithubURL] = useState();
  const [linkedinURL, setLinkedInURL] = useState();
  const [portfolioURL, setPortfolioURL] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email,
        password,
        passwordCheck,
        username,
        bio,
        githubURL,
        linkedinURL,
        portfolioURL,
      };
      await Axios.post("http://localhost:5000/users/register", newUser);
  
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
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
    <div className="container loginContainer row">
      <h5>Get coding with us:</h5>
  {error && (
    <ErrorNotice message={error} clearError={() => setError(undefined)} /> 
  )}
      <form className="register-form" onSubmit={submit}>
          <div className="input-field col s12">
          <input
            id="email"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="validate"
            required
          />
          <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              id="register-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
             <label htmlFor="register-password">Password</label>
          </div>
          <div className="input-field col s12">
            <input
              type="password"
              onChange={(e) => setPasswordCheck(e.target.value)}
              required
            />
            <label htmlFor="verify-password">Verify Password</label>
          </div>
          <div className="input-field col s12">
            <input
              id="register-username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
                <label htmlFor="register-username">Username</label>
          </div>
          <div className="input-field col s12">
            <input
              id="register-bio"
              type="text"
              onChange={(e) => setBio(e.target.value)}
            />
            <label htmlFor="register-bio">Bio</label>
          </div>
          <div className="input-field col s12">
            <input
              id="register-githubURL"
              type="text"
              onChange={(e) => setGithubURL(e.target.value)}
            />
               <label htmlFor="register-githubURL">Github URL</label>
          </div>
          <div className="input-field col s12">
            <input
              id="register-linkedInURL"
              type="text"
              onChange={(e) => setLinkedInURL(e.target.value)}
            />
             <label htmlFor="register-linkedInURL">LinkedIn URL</label>
          </div>
        <div className="input-field col s12">
          <input
            id="register-portfolioURL"
            type="text"
            onChange={(e) => setPortfolioURL(e.target.value)}
          />
          <label htmlFor="register-portfolioURL">Portfolio URL</label>
        </div>
        <div className="submitContainer col s12">
          <input type="submit" className="waves-effect waves-light btn-large" value="Submit" />
        </div>
      </form>
    </div>
  );
}
