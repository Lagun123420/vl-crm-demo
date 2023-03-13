import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import cl from "./navbar.module.css"

import M from 'materialize-css'
import 'materialize-css'

export const Navbar = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)

    const { t, i18n } = useTranslation()

    const [langs, setLangs] = useState(["uk", "en"]);

    const handleLanguageSwitch = () => {
        const currentLangIndex = langs.indexOf(i18n.language);
        const nextLangIndex = (currentLangIndex + 1) % langs.length;
        const nextLang = langs[nextLangIndex];
        i18n.changeLanguage(nextLang);
    };
    
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }
    
    var sidenavs = document.querySelectorAll('.sidenav')
    for (var i = 0; i < sidenavs.length; i++){
        M.Sidenav.init(sidenavs[i]);
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                    <Link to="/create" className="brand-logo">VLR CRM</Link>
                    <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                    <ul id="nav" className="right hide-on-med-and-down">
                        <li><Link to="/create">{t('Create Client')}</Link></li>
                        <li><Link to="/createcar">{t("Create Car")}</Link></li>
                        <li><Link to="/createOrder">{t("Create Order")}</Link></li>
                        <li><Link to="/clients">{t("Clients List")}</Link></li>
                        <li><Link to="/orders">{t("Order List")}</Link></li>
                        <li><Link to="/cars">{t("Cars List")}</Link></li>
                        <li>
                            <Link className={cl.buttonLng} to="#" onClick={() => handleLanguageSwitch()}>{i18n.language === 'uk' ? 'EN' : 'UA'}</Link>
                        </li>
                        <li><a href="/links" onClick={logoutHandler}>{t("Logout")}</a></li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><Link to="/create">{t("Create Client")}</Link></li>
                <li><Link to="/clients">{t("Clients List")}</Link></li>
                <li><Link to="/createcar">{t("Create Car")}</Link></li>
                <li><Link to="/createOrder">{t("Create Order")}</Link></li>
                <li><Link to="/orders">{t("Order List")}</Link></li>
                <li><Link to="/cars">{t("Cars List")}</Link></li>
                <li>
                    <Link to="#" onClick={() => handleLanguageSwitch()}>{i18n.language === 'uk' ? 'EN' : 'UA'}</Link>
                </li>
                <li><a href="/links" style={{color: 'red'}} onClick={logoutHandler}>{t("Logout")}</a></li>
            </ul>
        </>
    )
}