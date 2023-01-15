import React from "react"
import { Route, Routes, Navigate} from "react-router-dom"
import { AuthPage } from "./pages/AuthPage"
import { CreateClientPage } from "./pages/CreateClientPage"
import { DetailClientPage } from "./pages/DetailClientPage"
import { ClientsPage } from "./pages/ClientsPage"
import { CreateCarPage } from "./pages/CreateCarPage"
import { CarsPage } from "./pages/CarsPage"
import { DetailCarPage } from "./pages/DetailCarPage"
import { CreateOrderPage } from "./pages/CreateOrderPage"
import { OrdersPage } from "./pages/OrdersPage"
import { DetailOrderPage } from "./pages/DetailOrderPage"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/clients" element={<ClientsPage/>}/>
                <Route path="/create" element={<CreateClientPage/>}/>
                <Route path="/createcar" element={<CreateCarPage/>}/>
                <Route path="/createOrder" element={<CreateOrderPage/>}/>
                <Route path="/cars" element={<CarsPage/>}/>
                <Route path="/orders" element={<OrdersPage/>}/>
                <Route path="/detail/:id" element={<DetailClientPage/>}/>
                <Route path="/detailCar/:id" element={<DetailCarPage/>}/>
                <Route path="/order/:id" element={<DetailOrderPage/>}/>
                <Route path="*" element={ <Navigate to="/create"/>}/>
            </Routes>
        )
    }
    return (
    <Routes>
        <Route path="/" element={<AuthPage/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
    )
}