import React, { useState } from "react";
import axios from "axios";

import { useAuth } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { isAuthenticated, isUser,username } = useAuth();
    const { setAuthStatus } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const api ="http://localhost:9090"
    const [data, setData] = useState([])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = () => {
        console.log("Username:", formData.username);
        console.log("Password:", formData.password);

        axios
            .post(
                `${api}/authenticate`,
                {
                    userName: formData.username,
                    userPassword: formData.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                setData(response.data)
                localStorage.setItem("token", response.data.jwtToken)
                setAuthStatus(true,true,response.data.user.userName)
                navigate("/recette")
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (

        <div className="card sm-3">
            <button onClick={() =>{
                console.log(isAuthenticated +" "+ isUser +" "+username)}} >Show data</button>
            <div className="card-header">Login</div>
            <div className="card-body">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    placeholder="username"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />

                <label className="form-label">Password</label>
                <input
                    type="password"
                    placeholder="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />

                <button className="btn btn-primary mt-3" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}
