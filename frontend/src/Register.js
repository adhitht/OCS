import React from 'react'

function CreateAlert(props) {
	if (props.message) {
		return <div className="alert">{props.message}</div>
	}
}

export default function Register(props) {
	return (
		<form className="form-box">
			<div className="form-heading"><p>Register</p></div>
			<div className="form-inputs">
				<CreateAlert message={props.registermessage} />
				<div className="input"><input className="input-box"
					id="rollno" placeholder="Roll Number" onChange={(e) => { props.setUsername(e.target.value); }} /></div>
				<div className="input"><input className="input-box"
					id="name" placeholder="Name" onChange={(e) => { props.setnameofuser(e.target.value); }} /></div>
				<div className="input"><input type="email" className="input-box"
					id="email" placeholder="Email" onChange={(e) => { props.setEmail(e.target.value); }} /></div>
				<div className="input"><input type="password" className="input-box"
					id="password" placeholder="Password" onChange={(e) => { props.setPassword(e.target.value); }} /></div>
				<div className="input"><input type="url" className="input-box"
					id="cvlink" placeholder="CV Link" onChange={(e) => { props.setCVlink(e.target.value); }} /></div>
			</div>
			<button className="form-submit" onClick={props.register}>Register</button>
		</form>
	)
}
