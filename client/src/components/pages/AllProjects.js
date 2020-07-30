import React, {useEffect, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';

const AllProjects = () => {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const [projects, setProjects] = useState({})
  
    async function getAllProjects () {
        if(!userData.user) history.push('/login');
        try {
            const projects = await Axios.get('http://localhost:5000/projects', {
                headers:{
                  "x-auth-token":userData.token
                }
            })
            setProjects(projects)
            console.log(projects)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        Axios.get('http://localhost:5000/projects', {
            headers:{
              "x-auth-token":userData.token
            }
        })
        .then(response => {
            
        })
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default AllProjects;