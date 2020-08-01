import React, {useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext'
import Axios from 'axios';

export default function Home() {
  const {userData} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if(!userData.user) history.push('/login')
  });

  console.log(userData.user)
  return (
    <div className="container">
      <div className="card darken-1">
        <div className="card-content">
          <div className="card-darken">
            <h5 className="center">Your Info:</h5>
            <br>
            </br>
          <h6><strong>Name:</strong> {userInfo.username} </h6> 
            <p className="bolder">Github: {userInfo.githubURL }</p>
            <p className="bolder">Portfolio: {userInfo.portfolioURL}</p>
            <br />    
            <p className="bolder">Bio: </p>
            <p>{userInfo.bio}</p>
          </div>
            
                
            </div>
      </div> 
      <div className="row">       
        <div className="center">
            <h3>Projects you have opened!</h3>
            <div className="all-user-projects">
              <AllUserProjects />
            </div>
        </div>
      </div>  
    </div>
  )
}