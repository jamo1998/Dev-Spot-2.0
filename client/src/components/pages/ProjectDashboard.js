import React, { useState, useEffect } from 'react'
import Comment from '../misc/Comment'
import M from 'materialize-css'


const ProjectDashboard = (props) => {
    let [title, setTitle] = useState('')
    let [author, setAuthor] = useState('')
    
    useEffect(() => {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});
      }, []);

    

    return (
        <div className="container">
            <h2>Project Dashboard:</h2>
            <div className="projectDescription">
                <h5>Project.Name :</h5>
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
                        <form className="" action="POST" route="">
                            <input type="submit" className="waves-effect waves-light btn-large" value="Apply" />
                        </form>
                        </div>
                    </div>
            </div>
            <div className>
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
                <div className="form-group">
                <label htmlFor="title">Title:</label>
                    <input type="text" name="title" value={ title }  className="form-control" />
                </div>
                    <Comment />
                </div>
        </div>
    )
    
}

export default ProjectDashboard