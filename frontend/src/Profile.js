import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function CreateAlert(props) {
    if (props.message) {
        return <div className="alert">{props.message}</div>
    }
}

export default function Profile(props) {
    const [nameofuser, setnameofuser] = useState("");
    const [email, setEmail] = useState("");
    const [cvlink, setCVlink] = useState("");
    const [username, setUsername] = useState("");
    const [Loading, setLoading] = useState("Loading");
    const [message, setmessage] = useState("");

    const update = () => {
        Axios.post("http://localhost:2000/update", {
            username: username,
            name: nameofuser,
            email: email,
            cvlink: cvlink,
        }, {
            headers: { "x-access-token": localStorage.getItem("token") }
        }).then((response) => {
            setmessage(response.data.message);
        });
    };

    const deleteac = () => {
        if (window.confirm("Are you sure you want to delete your account")) {
            Axios.post("http://localhost:2000/delete", {
                cvlink: cvlink,
            }, {
                headers: { "x-access-token": localStorage.getItem("token") }
            }).then((response) => {
                props.setregistermessage(response.data.message);
                props.setIndex(1);
                props.setIsLoggedIn(false);
                localStorage.removeItem("token");
            });
        }

    };

    useEffect(() => {
        const loaddata = async () => {
            const response = await Axios.get("http://localhost:2000/auth", {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                }
            });
            setEmail(response.data.email);
            setnameofuser(response.data.name);
            setCVlink(response.data.cvlink);
            setUsername(response.data.username);
            setLoading("");
        }
        loaddata();
    }, ['']);


    return (
        <>
        <div className='back' onClick={()=>{props.setIndex(2)}}>Back</div>
        <div className="form-box">
            <div className="form-heading"><p>Edit Details</p></div>
            <div className="form-inputs">
                <CreateAlert message={Loading} />
                <CreateAlert message={message} />
                <div className="input"><input className="input-box disabled"
                    id="rollno" placeholder="Roll Number" value={username} disabled /></div>
                <div className="input"><input className="input-box"
                    id="name" placeholder="Name" value={nameofuser} onChange={(e) => { setnameofuser(e.target.value); }} /></div>
                <div className="input"><input className="input-box"
                    type="email" id="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); }} /></div>
                <div className="input"><input type="url" className="input-box"
                    id="cvlink" placeholder="CV Link" value={cvlink} onChange={(e) => { setCVlink(e.target.value);}} /></div>
            </div>
            <div className="submit-buttons">
                <button className="form-submit" onClick={update}>Edit</button><button className="form-submit delete" onClick={deleteac}>Delete</button>
            </div>
        </div>
        </>
    )
}

