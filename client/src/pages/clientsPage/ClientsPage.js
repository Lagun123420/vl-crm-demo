import React, { useCallback, useContext, useEffect, useState } from "react"
import {useHttp} from "../../hooks/http.hook"
import {AuthContext} from "../../context/AuthContext"
import { Loader } from "../../components/loader/Loader"
import { ClientsList } from "../../components/clientList/ClientsList"
import { useTranslation } from "react-i18next"

import cl from './clientsPage.module.css'

export const ClientsPage = () => {
    const {t} = useTranslation()

    const [clients, setClients] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchClients = useCallback(async () => {
        try {
            const fetched = await request('/api/client', "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setClients(fetched)
            return(fetched)
        } catch (error) {
            
        }
    }, [token, request] )

    useEffect(() => {
      fetchClients()
    }, [])
    
    if(loading) {
        return <Loader/>
    }

    return (
        <div className={cl.container}>  
            <div className="col s8 offset-s2">
                <div className={cl.title}>{t("Clients Page")}</div>
            </div>
            {!loading && <ClientsList clients = {clients} />}
        </div>
    )
}