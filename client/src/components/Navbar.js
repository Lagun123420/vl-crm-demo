import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import 'materialize-css'

export const Navbar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }
    
    
    // document.addEventListener('DOMContentLoaded', function() {
    //     var elems = document.querySelectorAll('.sidenav');
    //     var instances = M.Sidenav.init(elems, options);
    //   });

    return (
        <>
            <nav>
                <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                    <Link to="/create" className="brand-logo">VLR CRM</Link>
                    <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                    <ul id="nav" className="right hide-on-med-and-down">
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

            <ul className="sidenav" id="mobile-demo">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">Javascript</a></li>
                <li><a href="mobile.html">Mobile</a></li>
            </ul>
        </>
    )
}