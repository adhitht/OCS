import './App.css';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar.js';
import Login from './Login';
import Register from './Register';
import Axios from 'axios';
import CVList from './CVList';
import Profile from './Profile';

function MainView(props) {
  switch (props.ViewId) {
    case 0:
      return (<Login loginmessage={props.loginmessage} setUsername={props.StateChanges[0]} setPassword={props.StateChanges[1]} login={props.login} />);
    case 1:
      return <Register registermessage={props.registermessage} setUsername={props.StateChanges[0]} setPassword={props.StateChanges[1]} setEmail={props.StateChanges[3]} setCVlink={props.StateChanges[4]} setnameofuser={props.StateChanges[2]} register={props.register} />
    case 2:
      return <CVList list={props.cvlist} />
    case 3:
      return <Profile setregistermessage={props.setregistermessage} setIndex={props.setIndex} setIsLoggedIn={props.setIsLoggedIn} />
  }
}

function App() {
  const [username, setUsername] = useState("");
  const [nameofuser, setnameofuser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cvlink, setCVlink] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageIndex, setIndex] = useState(0);
  const [newUser, setNewUser] = useState(false);
  const [loginmessage, setloginmessage] = useState("");
  const [registermessage, setregistermessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIndex(2);
      setIsLoggedIn(true);
    }
  }, [""]);

  const login = () => {
    Axios.post("http://localhost:2000/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.auth) {
        setIsLoggedIn(true);
        setIndex(2);
        localStorage.setItem("token", response.data.token);
      }
      else {
        setIsLoggedIn(false);
      }
      setloginmessage(response.data.message);
    });
  };

  const register = () => {
    Axios.post("http://localhost:2000/register", {
      username: username,
      name: nameofuser,
      password: password,
      email: email,
      cvlink: cvlink,
    }).then((response) => {
      if (response.data.created) {
        setloginmessage("You can login now");
        setIndex(0);
      }
    });
  };

  return (
    <div className='body'>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIndex={setIndex} />
      <MainView ViewId={pageIndex}
        loginmessage={loginmessage}
        setloginmessage={setloginmessage}
        registermessage={registermessage}
        setregistermessage={setregistermessage}
        setIsLoggedIn={setIsLoggedIn}
        setIndex={setIndex}
        StateChanges={[setUsername, setPassword, setnameofuser, setEmail, setCVlink]}
        login={login}
        register={register} />
    </div>
  );
}

export default App;
