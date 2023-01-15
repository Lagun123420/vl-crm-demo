import React, { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
// import { CarCard } from "../components/CarCard"
import { Loader } from "../components/Loader"
import { OrderCard } from "../components/OrderCard"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"

export const DetailOrderPage = () => {
    const navigate = useNavigate()
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [order, setOrder] = useState(null)
    
    const orderId = useParams().id

    const getOrder = useCallback(async () => {
        try {
            const fetched = await request(`/api/order/${orderId}`, "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setOrder(fetched)
            return(fetched)
        } catch (error) {}
    }, [token, orderId, request])

    const deleteOrder = useCallback(async () => {
        try {
            const deleteData = await request(`/api/order/${orderId}`, "DELETE", null, {
                Authorization: `Bearer ${token}`
            })
            navigate('/orders')
        } catch (error) {
        }
    }, [])

    useEffect(() => {
        getOrder()
    }, [])

    if(loading) {
        return(<Loader />)
    }

    return(
        <div>
            {/* 123 */}
            {!loading && order && <OrderCard order={order} deleteOrder={deleteOrder}/>}
        </div>
    )
}