import React, { useEffect, useState } from 'react';
import Axios from 'axios';


function CVCont(props) {
    var maillink = 'mailto:' + props.email
    return <div className="cv-cont">
        <div className="cv-head">{props.name}</div>
        <div className="button-cont">
            <div className="mail-box">
                <a target="_blank" href={props.cvlink}>CV Link</a>
            </div>
            <div className="mail-box">
                <a target="_blank" href={maillink}>Mail</a>
            </div>

        </div>
    </div>
}

export default function CVList(props) {
    const [CVlist, setCVlist] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:2000/cv", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }).then((res) => setCVlist(res.data));
    }, []);

    return (
        <div className="cv-main-cont">
            <p>CV </p>
            {CVlist.map(cv => (<CVCont key={cv.email} name={cv.name} email={cv.email} cvlink={cv.cvlink} />))}
        </div>
    )
}