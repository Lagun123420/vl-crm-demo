// import { request } from "express"
import React, {useCallback, useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import {useHttp} from '../../hooks/http.hook'
import { useTranslation } from "react-i18next"

import cl from './createCarPage.module.css'


export const CreateCarPage = () => {
    const {t} = useTranslation()

    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [clients, setClients] = useState([])
    const [car, setCar] = useState({
        carMark: '',
        carModel: '',
        carYear: '',
        carEngine: '',
        carNumber: '',
        carVinCode: '',
        carColor: '',
        client: []
    })

    useEffect(()=> {
        getClients()
        window.M.updateTextFields()
    },[])

    const getClients = useCallback(async () => {
        try {
            const fetched = await request('/api/client', "GET", null, {
                Authorization: `Bearer ${auth.token}`
            })
            setClients(fetched)
            return(fetched)
        } catch (error) {
            
        }
    },[auth.token, request])

    const selectClient = event => {
        setCar({ ...car, client: [clients[event.target.value]._id] })

    }

    const changeHandler = event => {
        setCar({ ...car, [event.target.name]: event.target.value })
    }

    const createHandler = async (e) => {
        e.preventDefault();

        try {
            const data = await request('/api/car/create-car/', "POST", {...car}, {Authorization: `Bearer ${auth.token}`})
            navigate(`/cars`)
            } catch (error) {
        }
    }

    return (
        // <div className="row">
        <div className={cl.container}>
            {/* <form className='col s12'> */}
            <form className=''>
            {/* <form> */}
                {/* <div className="col s8 offset-s2"> */}
                <div className="">
            {/* <div> */}
                    <div className={cl.title}>{t("Create Car")}</div>
                </div>
                {/* <div className="col s8 offset-s2" style={{paddingTop: '2rem', paddingBottom: '2rem'}}> */}
                <div className="" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
                    <label>{t("Client")}</label>
                    {/* <select className="browser-default" defaultValue="DEFAULT" onChange={selectClient}> */}
                    <select className="browser-default" defaultValue="DEFAULT" onChange={selectClient}>
                        <option value="DEFAULT" disabled={true} >{t("Select client")}</option>
                        {clients.map((client, index) => {
                            return(
                                <option key={client._id} value={index}>{client.firstName} {client.phoneNumber}</option>
                            )
                        })}
                    </select>                   
            
                    {/* <div className="input-field"> */}
                    <div className="">
                        <input 
                            id="carMark" 
                            type="text" 
                            name='carMark'
                            onChange={changeHandler}
                        />
                        <label htmlFor="carMark">{t("Mark")} *</label>
                    </div>
                    {/* <div className="input-field"> */}
                    <div className="">
                        <input 
                            id="carModel" 
                            type="text" 
                            name='carModel'
                            onChange={changeHandler}
                        />
                        <label htmlFor="carModel">{t("Model")} *</label>
                    </div>
                    {/* <div className="input-field"> */}
                    <div className="">
                        <input 
                            id="carYear" 
                            type="text" 
                            name='carYear'
                            onChange={changeHandler}
                        />
                        <label htmlFor="carYear">{t("Year")}</label>
                    </div>
                    {/* <div className="input-field"> */}
                    <div className="">
                        <input 
                            id="carEngine" 
                            type="text" 
                            name='carEngine'
                            onChange={changeHandler}
                        />
                        <label htmlFor="carEngine">{t("Engine")}</label>
                    </div>
                    {/* <div className="input-field"> */}
                    <div className="">
                        <input 
                            id="carNumber" 
                            type="text" 
                            name='carNumber'
                            onChange={changeHandler}
                        />
                        <label htmlFor="carNumber">{t("Number")}</label>
                    </div>
                    {/* <div className="input-field"> */}
                    <div className="">
                        <input 
                            id="carVinCode" 
                            type="text" 
                            name='carVinCode'
                            onChange={changeHandler}
                        />
                        <label htmlFor="carVinCode">{t("VinCode")}</label>
                    </div>
                    {/* <div className="input-field"> */}
                    <div className="">
                        <input 
                            id="carColor" 
                            type="text" 
                            name='carColor'
                            onChange={changeHandler}
                        />
                        <label htmlFor="carColor">{t("Color")}</label>
                    </div>
                    {/* <div className="card-action"> */}
                    <div className={cl.action_buttons}>
                        <button 
                            // className='btn yellow darken-4' 
                            className={cl.action_button} 
                            style={{marginRight:10}}
                            onClick={createHandler}
                        >{t("Create Car")}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}