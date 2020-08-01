import React, { useState } from 'react'
import {  Link, Redirect } from 'react-router-dom'
import Axios from 'axios'


const ProjectCard = (props) => {
  console.log(props.project)
  
  let [toApply, setToApply] = useState(false)
  let [projectInfo, setProjectInfo] = useState("")
  const handleSubmit = () => {
    console.log(props.project)
    setProjectInfo(props.project)
    setToApply(true)
    console.log(projectInfo) 
  }
  
  if(toApply === true) {
   return <Redirect to={"/apply/" + props.project._id} project={projectInfo}  />
  
  }
    return (
        <div className="col s12">
          <div className="card darken-1">
            <div className="card-content">
              <span className="card-title">{props.project.title}</span>
              <p>{props.project.description}</p>
            </div>
            <div className="card-action">
            <form onSubmit={handleSubmit}>
              <div className="submitContainer">
              <input type="submit" className="waves-effect waves-light btn-large" value="Apply" />
              </div>
            </form>
            </div>
          </div>
        </div>
   
    )
   
}

export default ProjectCard;
