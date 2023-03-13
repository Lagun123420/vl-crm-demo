import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import {useTranslation} from 'react-i18next'

import Lottie from 'react-lottie';
import animationData from '../../lotties/137560-sea-walk.json';

import cl from './AuthPage.module.css'

export const AuthPage = () => {
    const { t } = useTranslation();

    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=> {
        window.M.updateTextFields()
    },[])


    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', "POST", {...form})
            message(data.message)
            loginHandler()
        } catch (error) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', "POST", {...form})
            auth.login(data.token, data.userId, data.tokenExp)
        } catch (error) {}
    }

    return (
        <div className={cl.container}>
            <form className='col s12'>
                <div className='col s6 offset-s3'>
                    <div className={cl.container_lottie_walker}>
                        <div className={cl.lottie_walker}>
                            <Lottie 
                                options={defaultOptions}
                                height={100}
                                width={100}
                            />
                        </div>
                    </div>
                    
                    <div className={cl.titleLogo}>VLR CRM</div>
                    <div className={cl.container_main}>
                        <div className={cl.container_block}>
                            <span className={cl.container_block_title}>{t("Authorization")}</span>
                            <div>
                                <div className="input-field">
                                    <input 
                                        id="email" 
                                        type="text" 
                                        name='email'
                                        className=''
                                        onChange={changeHandler}
                                        value={form.email}
                                    />
                                    <label htmlFor="email">{t("Email")}</label>
                                </div>

                                <div className="input-field">
                                    <input 
                                        id="password" 
                                        type="password" 
                                        name='password'
                                        className=''
                                        onChange={changeHandler}
                                        value={form.password}
                                    />
                                    <label htmlFor="password">{t("Password")}</label>
                                </div>

                            </div>
                        </div>
                        <div className={cl.action_buttons}>
                            <button 
                                className={cl.action_buttons_login} 
                                style={{marginRight:10}}
                                disabled={loading}
                                onClick={loginHandler}
                            >{t("login")}</button>
                            
                            <button 
                                className={cl.action_buttons_register}
                                onClick={registerHandler}
                                disabled={loading }
                            >{t("register")}</button>
                        </div>
                    </div>
                </div>
            </form>
            
            


        </div>
    )
}