import React, { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CarCard } from "../../components/CarCard"
import { Loader } from "../../components/Loader"
import { AuthContext } from "../../context/AuthContext"
import { useHttp } from "../../hooks/http.hook"

export const DetailCarPage = () => {
    const navigate = useNavigate()
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [car, setCar] = useState(null)
    
    const carId = useParams().id

    const getCar = useCallback(async () => {
        try {
            const fetched = await request(`/api/car/${carId}`, "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setCar(fetched)
            return(fetched)
        } catch (error) {}
    }, [token, carId, request])

    const deleteCar = useCallback(async () => {
        try {
            const deleteData = await request(`/api/car/${carId}`, "DELETE", null, {
                Authorization: `Bearer ${token}`
            })
            navigate('/cars')
        } catch (error) {
        }
    }, [])

    useEffect(() => {
        getCar()
    }, [])

    if(loading) {
        return(<Loader />)
    }

    return(
        <div>
            {!loading && car && <CarCard car={car} deleteCar={deleteCar}/>}
        </div>
    )
}