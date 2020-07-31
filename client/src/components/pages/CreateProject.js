import React, {useEffect, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';


const CreateProject = () => {

    //where will we add collaborators?
    //comments [embedded]
    //link to manager id
    //applicants for the project
    // completed set to false
    const {userData} = useContext(UserContext);
    const history = useHistory();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    console.log(userData)

    async function createProject(e) {
        e.preventDefault();

        // if(!userData.username) history.push('/login');
        try {
            const newProject = {
                title,
                description
            };

            const newProj = await Axios.post('http://localhost:5000/projects/new', newProject, {
                headers:{
                    "x-auth-token":userData.token
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    // const handleSubmit (e) => {
    //     e.preventDefault();
        
    //     const newProject = {
    //       title,
    //       description,
    //     };
    //     Axios.post("http://localhost:5000/projects/new", newProjects, {
    //         headers:{
    //             "x-auth-token":userData.token
    //         }
    //     })
    // }

    return (
        <div className="create-a-project">
            <div className="row">
                <div className="col s12">
                    <div className="card card-body create-project-form">
                        <h4 className="py-2">Create A Project</h4>
                        <form onSubmit={createProject}>
                            <div className="input-field col s12">
                                <label htmlFor="name">Title</label>
                                <input type="text" name="name" value={title} onChange={handleTitle} className="validate" />
                            </div>
                            <div className="input-field col s12">
                                <label htmlFor="email">Description</label>
                                <input type="text" name="description" value={description} onChange={handleDescription} className="validate" />
                            </div>
                           
                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default CreateProject;