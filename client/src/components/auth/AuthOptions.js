import React, {useContext} from 'react';
import {useHistory, Link} from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function AuthOptions() {
  const {userData, setUserData} = useContext(UserContext)

  const history = useHistory();

  const register = () => {
    history.push('/register')
  }

  const login = () => {
    history.push('/login')
  }

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem("auth-token", "")
  }

  return (
    <nav> 
      <div className="nav-wrapper container">
      <Link to="/" className="left brand-logo">DevSpot</Link>
      {userData.user ? (
        <>
        <ul id="nav-mobile" className="right hide-on-small-only">
          <li> <button className="nav-link" onClick={logout}>Logout</button> </li>
          <li> <button className="nav-link" to='/'>Home</button> </li>
        </ul>
        </>
      ) : (
        <>
        <ul id="nav-mobile" className="right hide-on-small-only">
          <li> <Link className="nav-link" onClick={login} to='/login'>Login</Link> </li>
          <li> <Link className="nav-link" onClick={register} to='/register'>Register</Link> </li>
        </ul>
        </>
      )
      }    
    </div>
    </nav>

  )
}
