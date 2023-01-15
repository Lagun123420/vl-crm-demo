import React, { useCallback, useContext, useEffect, useState } from "react"
import {useHttp} from "../hooks/http.hook"
import {AuthContext} from "../context/AuthContext"
import { Loader } from "../components/Loader"
import { ClientsList } from "../components/ClientsList"

export const ClientsPage = () => {
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
        <div className="wrapper">  
            <div className="col s8 offset-s2">
                <h1>Clients Page</h1>
            </div>
            {!loading && <ClientsList clients = {clients} />}
        </div>
    )
}