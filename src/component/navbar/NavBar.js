import React from 'react';
import {redirect, useHref} from "react-router-dom";

const NavBar = ({isAuthenticated,isUser}) => {
    const handleLogout =()=>{
        localStorage.clear()
        redirect("/login")
    }
    if(isAuthenticated){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {!isUser && <a className="navbar-brand" href="/dashoard" >Dashboard</a>}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/recette" >Recette</a>
                            </li>

                            {/*<li className="nav-item dropdown">*/}
                            {/*    <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">*/}
                            {/*        Dropdown*/}
                            {/*    </a>*/}
                            {/*    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                            {/*        <li><a className="dropdown-item" >Action</a></li>*/}
                            {/*        <li><a className="dropdown-item" >Another action</a></li>*/}
                            {/*        <li><hr className="dropdown-divider"></hr></li>*/}
                            {/*        <li><a className="dropdown-item" >Something else here</a></li>*/}
                            {/*    </ul>*/}
                            {/*</li>*/}
                        </ul>
                        <div>
                                <button className="btn btn-outline-success"  >Profile</button>
                            <button className="btn btn-outline-danger" onClick={handleLogout}  >se deconnecter</button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
    // else {
    //     return (
    //         // <div>
    //         //     you are not authorized
    //         // </div>
    //     )
    // }

};

export default NavBar;
