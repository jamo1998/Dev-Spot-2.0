import React, {useEffect, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
import AllUserProjects from './AllUserProjects';

export default function Home() {
  const {userData} = useContext(UserContext);
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({})

  async function getUserData( ) {
    //semantic naming^
    if(!userData.user) history.push('/login');
    try {
      const userInfo = await Axios.get('http://localhost:5000/users', {
        headers:{
          "x-auth-token":userData.token
        }
      });
      setUserInfo(userInfo.data);
      // console.log(userInfo.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {getUserData()}, []);

  // useEffect(() => {
  //   Axios.get('http://localhost:5000/users', {
  //     headers:{
  //       "x-auth-token":userData.token
  //     }
  //   }).then(response => {
  //     setUserInfo(response.data);
  //   }).catch(err => {
  //     console.log(err)
  //   }, )

  // }, [])
  
  if(!userInfo.username) {
    return null
  }

 

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