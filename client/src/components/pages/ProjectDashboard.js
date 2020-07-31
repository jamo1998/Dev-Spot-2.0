import React, { useState, useEffect, useContext } from 'react'
// import Comment from '../misc/Comment'
// import M from 'materialize-css'
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';

const ProjectDashboard = (props) => {
    const {userData} = useContext(UserContext);
    const history = useHistory();

    let [projectInfo, setProjectInfo] = useState({})

    // useEffect(() => {
    //     var elems = document.querySelectorAll('.collapsible');
    //     var instances = M.Collapsible.init(elems, {});
    // }, []);

    async function getProjectData() {
        if(!userData.user) history.push('/login');

        try {
            const project = await Axios.get('http://localhost:5000/projects/all', {
              headers:{
                "x-auth-token":userData.token
              }
            });
            setProjectInfo(project.data);
            console.log(projectInfo)
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {getProjectData()}, []);

    // if(!projectInfo) {
    //     return null
    // }

    // useEffect(() => {
    //     Axios.get('http://localhost:5000/projects/5f23257d61c6a5305c2ef0b6', {
    //           headers:{
    //             "x-auth-token":userData.token
    //           }
    //     }).then(response => {
    //         setProjectInfo(response)
    //         console.log(projectInfo);
    //     }).catch (error => {
    //         console.log(error)
    //     })
    // }, [])




    return (
        <div className="container">
            <h2>Project Dashboard:</h2>
            <div className="projectDescription">
                <h5>Project Name :  </h5>
                    <div className=" row">
                        <div className="col s3">
                        <img src="http://placekitten.com/200/100" alt="project img" />
                        </div>
                    </div>
                    <div className=" row">
                        <div className="col s9">
                        <p>I'm baby pork belly bitters hoodie drinking vinegar, poutine vice literally small batch art party asymmetrical seitan before they sold out tacos.I'm baby pork belly bitters hoodie drinking vinegar, poutine vice literally small batch art party asymmetrical seitan before they sold out tacos. Raclette selvage yuccie, scenester bicycle rights roof party PBR&B four loko. Fam authentic knausgaard flannel hot chicken chillwave. VHS irony taxidermy, tofu franzen typewriter ennui. Iceland ramps hot chicken forage street art, keytar banh mi mustache prism distillery pinterest microdosing meggings.:</p>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                        <form className="" action="" route="">
                            <input type="submit" className="waves-effect waves-light btn-large" value="Apply" />
                        </form>
                        </div>
                    </div>
            </div>
            <div>
                <h4>Post a comment</h4>
                <ul className="collapsible">
                  <li>
                    <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
                    <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                  </li>
                  <li>
                    <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
                    <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                  </li>
                  <li>
                    <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
                    <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                  </li>
                </ul>
            </div>
        </div>
    )
    
}

export default ProjectDashboard