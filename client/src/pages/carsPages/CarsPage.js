import React, { useCallback, useContext, useEffect, useState } from "react"
import {useHttp} from "../../hooks/http.hook"
import {AuthContext} from "../../context/AuthContext"
import { Loader } from "../../components/Loader"
import { CarsList } from "../../components/CarsList"

export const CarsPage = () => {
    const [cars, setCars] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchCars = useCallback(async () => {
        try {
            const fetched = await request('/api/car', "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setCars(fetched)
            return(fetched)
        } catch (error) {
            
        }
    }, [token, request] )

    useEffect(() => {
      fetchCars()
    }, [])
    
    if(loading) {
        return <Loader/>
    }

    return (
        <div className="row wrapper">
            <div>
                <h1>Cars Page</h1>
            </div>
            {!loading && <CarsList cars = {cars} />}
        </div>
    )
}