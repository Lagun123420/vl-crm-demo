import React, { useCallback, useContext, useEffect, useState } from "react"
import {useHttp} from "../../hooks/http.hook"
import {AuthContext} from "../../context/AuthContext"
import { Loader } from "../../components/Loader"
import { OrdersList } from "../../components/OrdersList"
import { SearchOrders } from "../../components/SearchOrders"

export const OrdersPage = () => {
    const [orders, setOrders] = useState([])
    const [clients, setClients] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchOrders = useCallback(async () => {
        try {
            const fetched = await request('/api/order', "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setOrders(fetched)
            return(fetched)
        } catch (error) {
            
        }
    }, [token, request] )

    const fetchClients = useCallback(async () => {
        try {
            const fetched = await request('/api/order', "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setClients(fetched)
            return(fetched)
        } catch (error) {
            
        }
    }, [token, request] )

    useEffect(() => {
      fetchOrders()
    }, [])
    useEffect(() => {
      fetchClients()
      
    }, [])
    
    if(loading) {
        return <Loader/>
    }

    // console.log(orders)

    return (
        <div className="wrapper">
            <div>
                <h1>Orders Page</h1>
            </div>

                {!loading && <OrdersList orders = {orders}/>}
        </div>
    )
}