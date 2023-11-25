import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./component/navbar/NavBar";
import ListRecette from "./component/recette/ListRecette";
import UpdateRecette from "./component/recette/UpdateRecette";
import Login from "./component/auth/Login";
// import SignUp from "./component/auth/SignUp";
import { AuthProvider, useAuth } from "./component/context/AuthContext";

function App() {
    const { isAuthenticated, isUser } = useAuth();

    return (
        <div className="App">
            <NavBar isAuthenticated={isAuthenticated} isUser={isUser} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/recette" element={<ListRecette isAuthenticated={isAuthenticated} isUser={isUser} />} />
                    <Route path="/recette/update" element={<UpdateRecette isAuthenticated={isAuthenticated} isUser={isUser} />} />
                    <Route path="/login" element={<Login />} />
                    {/*<Route path="/signup" element={<SignUp />} />*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);
