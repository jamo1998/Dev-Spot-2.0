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
    <div className="container"></div>

  )
}