import React from "react"
import { Route, Routes, Navigate} from "react-router-dom"
import { AuthPage } from "./pages/authPage/AuthPage"
import { CreateClientPage } from "./pages/clientsPage/CreateClientPage"
import { DetailClientPage } from "./pages/clientsPage/DetailClientPage"
import { ClientsPage } from "./pages/clientsPage/ClientsPage"
import { CreateCarPage } from "./pages/carsPages/CreateCarPage"
import { CarsPage } from "./pages/carsPages/CarsPage"
import { DetailCarPage } from "./pages/carsPages/DetailCarPage"
import { CreateOrderPage } from "./pages/orderPages/CreateOrderPage"
import { OrdersPage } from "./pages/orderPages/OrdersPage"
import { DetailOrderPage } from "./pages/orderPages/DetailOrderPage"
import { Home } from "./pages/home/Home"

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
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={ <Navigate to="/"/>}/>
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