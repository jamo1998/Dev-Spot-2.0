import React, {useEffect, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';

const AllUserProjects = () => {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const [activeProjects, setActiveProjects] = useState({})

    async function getAllUserProjects () {
        if(!userData.user) history.push('/login');
        try {
            const eachProject = await Axios.get('http://localhost:5000/projects/all', {
                headers: {
                    "x-auth-token":userData.token
                }
            });
            setActiveProjects(eachProject.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {getAllUserProjects()}, [])


    if(!activeProjects.data) {
        return null
    }

    console.log(activeProjects)

    const eachActiveProject = activeProjects((project) => {
        return(    
            <div>
                <li>
                    {project.title}
                </li>
                <li>
                    {project.description}
                </li>
                <li>
                    {project.releaseDate}
                </li>
            </div>
        )
    })

    return (
        <div>
            <ul>
                {eachActiveProject}
            </ul>
        </div>
    );
};

export default AllUserProjects;