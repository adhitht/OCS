import React from 'react'
import logo from './download.png';

function OcsOptions(props) {
    if (props.isLoggedIn) {
        return <div className="ocs-options">
            <a onClick={()=>{props.setIndex(3);}}>Profile</a>
            <a onClick={()=>{props.setIndex(0); localStorage.removeItem("token"); props.setIsLoggedIn(false);}}>LogOut</a>
            </div>
    }
    else {
        return <div className="ocs-options">
            <div id="login" onClick={()=>{props.setIndex(0)}}><a>Login</a></div>
            <div id="register" onClick={()=>{props.setIndex(1)}}><a>Register</a></div>
        </div>
    }
}

export default function Navbar(props) {
    return (
        <div className="navbar">
            <div className="ocs-header">
                <img src={logo} style={{ height: "80px" }} />
                <div className="ocs-title">
                    <div className="ocs-title1">OCS</div>
                    <div className="ocs-title2">IIT Hyderabad</div>
                </div>
            </div>
            <OcsOptions isLoggedIn={props.isLoggedIn} setIndex={props.setIndex} setIsLoggedIn={props.setIsLoggedIn}/>

        </div>
    )
}