// import { response } from "express";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";
import { useTranslation } from "react-i18next";

import cl from "./orderCard.module.css"

export const OrderCard = ({order, deleteOrder}) => {
    const {t} = useTranslation()

    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const message = useMessage()

    const changeStatusHandler = async (e) => {
        let status = e.target.value
        let id = order._id
        let messageConfirm = window.confirm('Confirm your order status change');
        
        if (messageConfirm) {
            try {
                const data = await request('/api/order/change-status/', "PUT", {id, status}, {Authorization: `Bearer ${auth.token}`})
                message(data.message)
                order.status = status
            } catch (error) {
                message(error)
                console.log(error)
            }
        } else {message('Status is not changed!')}
    }

    return(
        <div className={cl.container}>
            <div className={cl.containerCard}>
                <div className="row">
                    <div className="col s12">
                        <div className="card blue darken-1">
                            <div className="card-content white-text">
                                <div className="input-field">
                                    <select className="browser-default " defaultValue={"DEFAULT"} onChange={changeStatusHandler}>
                                        <option value={"DEFAULT"} disabled>{t("Change Status")}</option>
                                        <option value="New order">{t("New order")}</option>
                                        <option value="Coordination">{t("Coordination")}</option>
                                        <option value="In operation">{t("In operation")}</option>
                                        <option value="Waiting for payment">{t("Waiting for payment")}</option>
                                        <option value="Ready">{t("Ready")}</option>
                                        <option value="Closed">{t("Closed")}</option>
                                    </select>
                                </div>
                                <span className="card-title">{order.clientName}</span>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><span>{t("Order status")}</span></td>
                                            <td><span className={cl.statusTitle} style={{fontWeight: 700}}>{t(`${order.status}`)}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>{t("Contacts")}</span></td>
                                            <td><span>{order.clientPhone}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>{t("Mark")}</span></td>
                                            <td><span>{order.carMark}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>{t("Model")}</span></td>
                                            <td><span>{order.carModel}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>{t("Car Odometr")}</span></td>
                                            <td><span>{order.carOdometr}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span>{t("Recomendation")} : </span>
                                <p>{order.worksRecomendation}</p>
                            </div>
                            
                            <div className="card-action">
                                <button className="waves-effect waves-light btn red lighten-1" onClick={deleteOrder}>{t("Delete Order")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={cl.wrapperTables}>
                {/* <div style={{marginTop: 10}}> */}
                <div className={cl.containerTables}>
                    <label htmlFor="workTableList">{t("Works List")}</label>
                    <table id='workTableList'>
                        <thead>
                            <tr>
                                <th>{t("Number")}</th>
                                <th>{t("Name")}</th>
                                <th>{t("Time")}</th>
                                <th>{t("Qty")}</th>
                                <th>{t("Cost")}</th>
                                <th>{t("Sum")}</th>
                            </tr>
                        </thead>

                        <tbody id='workList'>
                            {Object.values(order.worksList[0]).map((workLine, index) => {
                                return (
                                    <tr>
                                        <td>{workLine.number}</td>
                                        <td>{workLine.workName}</td>
                                        <td>{workLine.worksTimes}</td>
                                        <td>{workLine.worksQty}</td>
                                        <td>{workLine.workCost}</td>
                                        <td>{workLine.workCostSum}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <label htmlFor="partsTableList">{t("Parts List")}</label>
                    <table id='partsTableList'>   
                        <thead>
                            <tr>
                                <th>{t("Number")}</th>
                                <th>{t("Parts Name")}</th>
                                <th>{t("Article")}</th>
                                <th>{t("Qty")}</th>
                                <th>{t("Cost")}</th>
                                <th>{t("Sum")}</th>
                            </tr>
                        </thead>

                        <tbody id='partsList'>
                            {Object.values(order.partsList[0]).map((partsLine, index) => {
                                return (
                                    <tr>
                                        <td>{partsLine.number}</td>
                                        <td>{partsLine.partsName}</td>
                                        <td>{partsLine.partsArticle}</td>
                                        <td>{partsLine.partsQty}</td>
                                        <td>{partsLine.partsCost}</td>
                                        <td>{partsLine.partsSum}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}