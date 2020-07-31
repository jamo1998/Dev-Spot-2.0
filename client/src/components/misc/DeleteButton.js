import React, {useEffect, useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';


const DeleteButton = (props) => {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const [toggleRefresh, setToggleRefresh] = useState(false)
    
    async function deleteProject(e) {
        e.preventDefault();
        console.log(props.project)
        // if(!userData.username) history.push('/login');
        try {
            const newProj = await Axios.delete(`http://localhost:5000/projects/${props.project}`, {
                headers:{
                    "x-auth-token":userData.token
                }
            })
            setToggleRefresh(true)
        } catch (error) {
            console.log(error)
        }
    }
        

    return (
        <form className="delete-bounty-button" onSubmit={deleteProject}>
            <input type="submit" value="Remove this Project" />
        </form>
    );
};

export default DeleteButton;