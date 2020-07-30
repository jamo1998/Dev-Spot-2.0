import React, {useEffect, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';

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
      <div className="card row">
        <div className="center">
            <p>Name: {userInfo.username} </p>
            <p>Email: </p>
            <p>Github: {userInfo.githubURL }</p>
            <p>Portfolio: {userInfo.portfolioURL}</p>
            </div>
            <div className="center row">
                <div className="col s8">
                    <p>Bio: </p>
                    <p>{userInfo.bio}</p>
                </div>
            </div>
      </div> 
      <div className="row">       
        <div className="card center">
            <p>Projects you have opened!</p>
        </div>
      </div>  
    </div>
  )
}