import React from "react";
import { Link } from "react-router-dom";
import { SearchOrders } from "./SearchOrders";

export const OrdersList = ({orders, fetchOrders}) => {
    if (!orders.length) {
        return (
            <>
                <div>
                    <p>Haven't orders</p>
                </div>
            </>
        )
    }

    // console.log(Object(orders).map)

    return(
        <>
            <div className="row">
                <div className="input-field col s6">
                    <i className="material-icons prefix">search</i>
                    <input id="icon_prefix" type="text" className="validate"/>
                    <label for="icon_prefix">Search by phone</label>
                    <button>Filter</button>
                </div>
            </div>
        

            <table>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Client name</th>
                        <th>Client phone</th>
                        <th>Car mark</th>
                        <th>Car model</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, index) => {
                        return(
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{order.clientName}</td>
                                <td>{order.clientPhone}</td>
                                <td>{order.carMark}</td>
                                <td>{order.carModel}</td>
                                <td className="red-text" >{order.status}</td>
                                <td>
                                    <div>
                                        <span>{order.date.substr(0, 10)}</span>
                                    </div>
                                    <div>
                                        <span>{order.date.substr(11, 5)}</span>
                                    </div>
                                    
                                </td>
                                    <td><Link to={`/order/${order._id}`} className="waves-effect waves-light btn blue lighten-1">Open</Link></td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </>
        
    )
}