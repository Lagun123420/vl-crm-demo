import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SearchOrders } from "../searchOrders/SearchOrders";
import { useTranslation } from "react-i18next";

export const OrdersList = ({orders, fetchOrders}) => {
    const {t} = useTranslation()

    const [filter, setFilter] = useState('')
    const [typeFilter, setTypeFilter] = useState('clientName')
    if (!orders.length) {
        return (
            <>
                <div>
                    <p>{t("Haven't orders")}</p>
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
                        <option value={"DEFAULT"} disabled>{t("Select search type")}</option>
                        <option value="clientName">{t("Client name")}</option>
                        <option value="clientPhone">{t("Client phone")}</option>
                        <option value="carMark">{t("Car mark")}</option>
                        <option value="carModel">{t("Car model")}</option>
                        <option value="status">{t("Order status")}</option>
                    </select>
                    
                </div>
                <div className="input-field col s6">
                    <i className="material-icons prefix">search</i>
                    <input id="icon_prefix" type="text" className="validate" onChange={changeHandlerFilter}/>
                    <label for="icon_prefix">{t("Search order")}</label>
                </div>
            </div>
        

            <table>
                <thead>
                    <tr>
                        <th>{t("Number")}</th>
                        <th>{t("Client name")}</th>
                        <th>{t("Client phone")}</th>
                        <th>{t("Car mark")}</th>
                        <th>{t("Car model")}</th>
                        <th>{t("Order status")}</th>
                        <th>{t("Date")}</th>
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
                                <td className="red-text" >{t(`${order.status}`)}</td>
                                <td>
                                    <div>
                                        <span>{order.date.substr(0, 10)}</span>
                                    </div>
                                    <div>
                                        <span>{order.date.substr(11, 5)}</span>
                                    </div>
                                    
                                </td>
                                    <td><Link to={`/order/${order._id}`} className="waves-effect waves-light btn blue lighten-1">{t("Open")}</Link></td>
                                </tr>
                            )}
                        }
                    )}
                </tbody>
            </table>
        </>
        
    )
}