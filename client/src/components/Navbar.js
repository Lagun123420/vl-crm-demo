import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                <Link to="/create" className="brand-logo">VLR CRM</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/create">Create Client</Link></li>
                    <li><Link to="/clients">Clients List</Link></li>
                    <li><Link to="/createcar">Create Car</Link></li>
                    <li><Link to="/createOrder">Create Order</Link></li>
                    <li><Link to="/orders">Order List</Link></li>
                    <li><Link to="/cars">Cars List</Link></li>
                    <li><a href="/links" onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    )
}