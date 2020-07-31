import React, {useEffect, useContext, useState} from 'react'
import {useHistory} from 'react-router-dom';
import Axios from 'axios'
import UserContext from '../../context/UserContext'
import ProjectCard from '../misc/ProjectCard';

const AllProjects = () => {
    const [projectInfo, setProjectInfo] = useState([])
    const {userData} = useContext(UserContext)
    const history = useHistory();
    console.log(userData)
    useEffect(() => {
        console.log("🥇 this is the axios call" )
        Axios.get(`http://localhost:5000/projects`, {
            
        }).then(response => {
            console.log(response)
            setProjectInfo(response.data);
            console.log(projectInfo)
        }).catch(err => {
            console.log(err)
        }, )
    }, [])
    const projectsDisplay =  projectInfo.map((project, i) => {
        console.log(project)
        return (
            <ProjectCard project={project} key={i} />
        )
    })
    return (
        <div className="container">
            <div className="row">
                <h4>All Projects:</h4>
                { projectsDisplay }
            </div>
        </div>
    )
}
export default AllProjects;
