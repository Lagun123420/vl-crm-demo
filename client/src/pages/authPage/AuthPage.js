import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import cl from './AuthPage.module.css'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

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
                    <div className={cl.titleLogo}>VLR CRM</div>
                    <div className={cl.container_main}>
                        <div className={cl.container_block}>
                            <span className={cl.container_block_title}>Authorization</span>
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
                                    <label htmlFor="email">Email</label>
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
                                    <label htmlFor="password">Password</label>
                                </div>

                            </div>
                        </div>
                        <div className={cl.action_buttons}>
                            <button 
                                className={cl.action_buttons_login} 
                                style={{marginRight:10}}
                                disabled={loading}
                                onClick={loginHandler}
                            >login</button>
                            
                            <button 
                                className={cl.action_buttons_register}
                                onClick={registerHandler}
                                disabled={loading }
                            >register</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}