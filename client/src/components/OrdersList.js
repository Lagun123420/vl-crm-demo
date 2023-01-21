import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SearchOrders } from "./SearchOrders";

export const OrdersList = ({orders, fetchOrders}) => {
    const [filter, setFilter] = useState('')
    const [typeFilter, setTypeFilter] = useState('clientName')
    if (!orders.length) {
        return (
            <>
                <div>
                    <p>Haven't orders</p>
                </div>
            </>
        )
    }

    // console.log(Object(orders).map((order, index) => {console.log(order.carMark)}))
    // console.log(orders[0].find({clientName: {$regex: `${filter}`} }}));
    // let filter = 'Вадим'

    const changeHandlerFilter = event => {
        setFilter(event.target.value)
    }

    const changeHandlerTypeFilter = event => {
        setTypeFilter(event.target.value)
        // console.log(orders)
    }

    console.log(orders)

    return(
        <>
            <div className="row">
                
                <div className="input-field col s4">
                    <select className="browser-default " defaultValue={"DEFAULT"} onChange={changeHandlerTypeFilter}>
                        <option value={"DEFAULT"} disabled>Select search type</option>
                        <option value="clientName">Client name</option>
                        <option value="clientPhone">Client phone</option>
                        <option value="carMark">Car mark</option>
                        <option value="carModel">Car model</option>
                        <option value="status">Oder status</option>
                    </select>
                    
                </div>
                <div className="input-field col s6">
                    <i className="material-icons prefix">search</i>
                    <input id="icon_prefix" type="text" className="validate" onChange={changeHandlerFilter}/>
                    <label for="icon_prefix">Search order</label>
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
                        // let validFilter = order[typeFilter].toLowerCase().includes(filter.toLowerCase());  
                        let validFilter = ''  
                        if (typeFilter === 'clientPhone') {
                            validFilter = order[typeFilter].toString().includes(filter);
                        } else {
                            validFilter = order[typeFilter].toLowerCase().includes(filter.toLowerCase());
                        }
                        
                        // if (order[typeFilter].toLowerCase().includes(filter.toLowerCase())) {
                        if (validFilter) {
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
                            )}
                        }
                    )}
                </tbody>
            </table>
        </>
        
    )
}