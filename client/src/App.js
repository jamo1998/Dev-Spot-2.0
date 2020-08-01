import React, {useState, useEffect} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserContext from './context/UserContext';
import ProjectDashboard from './components/pages/ProjectDashboard';
import 'materialize-css/dist/css/materialize.min.css';
import './styles/style.css';
import CreateProject from './components/pages/CreateProject';
import AllProjects from './components/pages/AllProjects';
import Apply from './components/pages/Apply';

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkedLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem('auth-token', "");
        token = ""
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token}  }
      )
      if (tokenRes.data) {
        const userRes = await Axios.get('http://localhost:5000/users/', 
        { headers: { "x-auth-token": token},
        });
        setUserData({
          token,
          user: userRes.data
        })
      }
    }

    checkedLoggedIn();
  }, [])

  return <>
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData}}>
        <Header />
        <br />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path='/project' component={ProjectDashboard} />
            <Route path='/createproject' component={CreateProject} />
            <Route path='/all-projects' component={AllProjects} />
            <Route path='/apply' component={Apply} />
          </Switch>
        </div>
        
      </UserContext.Provider>
      
    </BrowserRouter>
  </>
}
