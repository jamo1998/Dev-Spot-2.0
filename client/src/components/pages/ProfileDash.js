import React from 'react'
import ProfileDashCard from './ProfileDashCard'
import Comment from './Comment'

const ProfileDash = () => {
    return (
        <div className="container">
            <h4>Active projects for User.name:</h4>
            <div>
                <ProfileDashCard />
            </div>
            <h5>Current Comments Map:</h5>
            <Comment />
        </div>
    )
}

export default ProfileDash