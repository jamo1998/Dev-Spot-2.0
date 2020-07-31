import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import Axios from 'axios'

const Apply = (project, props ) => {
    console.log(project.history.location.pathname.slice(7))
    let [linkedinURL, setLinkedinURL] = useState('')
    let [name, setName] = useState('')
    let [message, setMessage] = useState('')
    let [redirect, setRedirect] = useState(false)
    const newApplicant = {
        name,
        linkedinURL,
        message
    }
    let submitApplicant = (e) => {
        e.preventDefault()
       Axios.put(`http://localhost:5000/projects/${project.history.location.pathname.slice(7)}`, newApplicant)
       .then((response) => {
           console.log(response)
           setRedirect(true)
       }, []
       )
       .catch(error => console.log)
    }
    if(redirect === true) {
        return <Redirect to="/all-projects"  />
    }
    return (
        <div className="container loginContainer">
             <form className="applicant-form" onSubmit={submitApplicant}>
        <div className="input-field">
       
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
           <label htmlFor="name" className="black-text">Name:</label>
        </div>
        
        <div className="input-field">
          <input
            id="linkedinURL"
            type="text"
            onChange={(e) => setLinkedinURL(e.target.value)}
          />
          <label htmlFor="linkedinURL" className="black-text">LinkedIn Url:</label>
        </div>
        <div className="input-field">
          <input
            id="description"
            type="text"
            onChange={(e) => setMessage(e.target.value)}
          />
          <label htmlFor="message" className="black-text">What are your goals for this project?</label>
        </div>
        <br/>
        <br />
        <div className="submitContainer col s12">
          <input type="submit" className="waves-effect waves-light btn-large" value="Apply" />
        </div>
      </form>
        </div>
    )
}
export default Apply