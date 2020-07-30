import React from 'react'
import {  Link } from 'react-router-dom'


const ProfileDashCard = () => {
    return (
        <div class="row">
        <div class="col s4">
          <div class="card darken-1">
            <div class="card-content">
              <span class="card-title">Card Title</span>
              <p>I am a very simple card. .</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
        <div class="col s4">
          <div class="card darken-1">
            <div class="card-content">
              <span class="card-title">Card Title</span>
              <p>I am a very simple card. .</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    )
   
}

export default ProfileDashCard