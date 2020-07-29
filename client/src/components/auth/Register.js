import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from '../misc/ErrorNotice';

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
    <div className="page">
      <h2>Register</h2>
  {error && (
    <ErrorNotice message={error} clearError={() => setError(undefined)} /> 
  )}
      <form className="register-form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Verify Password"
          type="password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-username">Username</label>
        <input
          id="register-username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="register-bio">Bio</label>
        <input
          id="register-bio"
          type="text"
          onChange={(e) => setBio(e.target.value)}
        />

        <label htmlFor="register-githubURL">Github URL</label>
        <input
          id="register-githubURL"
          type="text"
          onChange={(e) => setGithubURL(e.target.value)}
        />

        <label htmlFor="register-linkedInURL">LinkedIn URL</label>
        <input
          id="register-linkedInURL"
          type="text"
          onChange={(e) => setLinkedInURL(e.target.value)}
        />

        <label htmlFor="register-portfolioURL">Portfolio URL</label>
        <input
          id="register-portfolioURL"
          type="text"
          onChange={(e) => setPortfolioURL(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
