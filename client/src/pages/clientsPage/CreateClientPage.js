// import { request } from "express"
import React, {useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import {useHttp} from '../../hooks/http.hook'
import { useTranslation } from "react-i18next"


export const CreateClientPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    const [client, setClient] = useState({
        firstName: '',
        phoneNumber: ''
    })

    useEffect(()=> {
        window.M.updateTextFields()
    },[])

    const changeHandler = event => {
        setClient({ ...client, [event.target.name]: event.target.value })
    }

    const createHandler = async (e) => {
        e.preventDefault();

        try {
            const data = await request('/api/client/create-client/', "POST", {...client}, {Authorization: `Bearer ${auth.token}`})
            navigate(`/detail/${data.client._id}`)
        } catch (error) {}
    }

    return (
        <div className="row">
            <form className='col s12'>
                <div className="col s8 offset-s2">
                    <h5>{t("Create Client")}</h5>
                </div>
                <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                        <div className="input-field">
                            <input 
                                // placeholder="Enter email" 
                                id="firstName" 
                                type="text" 
                                name='firstName'
                                onChange={changeHandler}
                            />
                            <label htmlFor="firstName">{t("First name")}</label>
                        </div>
                        <div className="input-field">
                            <input 
                                // placeholder="Enter email" 
                                id="phoneNumber" 
                                type="text" 
                                name='phoneNumber'
                                // className='yellow-input'
                                onChange={changeHandler}
                            />
                            <label htmlFor="phoneNumber">{t("Phone number")}</label>
                        </div>
                        <div className="card-action">
                            <button 
                                className='btn yellow darken-4' 
                                style={{marginRight:10}}
                                // disabled={loading}
                                onClick={createHandler}
                            >{t("Create")}</button>
                        </div>
                </div>
            </form>
        </div>
    )
}