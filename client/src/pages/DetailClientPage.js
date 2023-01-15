import React, { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClientCard } from "../components/ClientCard"
import { CarsList } from "../components/CarsList"
import { Loader } from "../components/Loader"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

export const DetailClientPage = () => {
    const navigate = useNavigate()
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [client, setClient] = useState(null)
    const [cars, setCars] = useState(null)
    
    const clientId = useParams().id

    const getClient = useCallback(async () => {
        try {
            const fetched = await request(`/api/client/${clientId}`, "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setClient(fetched)
            
            return(fetched)
        } catch (error) {}
    }, [token, clientId, request])

    const getClientCars = useCallback(async () => {
        try {
            const fetchedCars = await request(`/api/car/clientCars/${clientId}`, "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setCars(fetchedCars)
            return(fetchedCars)
        } catch (error) {}
    }, [token, request])

    const deleteClient = useCallback(async () => {
        try {
            const deleteData = await request(`/api/client/${clientId}`, "DELETE", null, {
                Authorization: `Bearer ${token}`
            })
            navigate('/clients')
        } catch (error) {
        }
    }, [])

    useEffect(() => {
        getClient()
        getClientCars()
    }, [])

    if(loading) {
        return(<Loader />)
    }

    return(
        <div className="row">
            <div className="col s2">
                {!loading && client && <ClientCard client={client} deleteClient={deleteClient}/>}
            </div>
            <div className="col s6">
                {!loading && cars && <CarsList cars={cars}/>}
            </div>

        </div>
    )
}