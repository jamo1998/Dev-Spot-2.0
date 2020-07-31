import React, {useEffect, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';
// import DeleteButton from './DeleteButton';

const AllUserProjects = () => {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const [activeProjects, setActiveProjects] = useState([])

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


    if(!activeProjects) {
        return null
    }

    console.log(activeProjects)


    const eachActiveProject = activeProjects.map((project, i) => {
        return(    
            <div className="card center" key={i}>
                <li >
                    <p>Title:</p>
                    {project.title}
                </li>
                <li>
                    <p>Description:</p>
                    {project.description}
                </li>
                <li>
                    <p>Release Date:</p>
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