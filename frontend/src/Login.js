import React from 'react'

function CreateAlert(props) {
  if (props.message) {
    return <div className="alert">{props.message}</div>
  }
}

export default function Login(props) {
  return (
    <div className="form-box">
      <div className="form-heading"><p>Login</p></div>      
      <div className="form-inputs">
        <CreateAlert message={props.loginmessage}/>
        <div className="input"><input className="input-box"
          id="email" placeholder="Roll Number" onChange={(e) => { props.setUsername(e.target.value); }} /></div>
        <div className="input"><input type="password" className="input-box"
          id="password" placeholder="Password" onChange={(e) => { props.setPassword(e.target.value); }} /></div>
      </div>
      <button className="form-submit" onClick={props.login}>Login</button>
    </div>

  )
}