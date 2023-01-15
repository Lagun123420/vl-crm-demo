import React from "react";
// import { json } from "react-router-dom";

export const OrderCard = ({order, deleteOrder}) => {
    return(
        <div className="row">
            <div className="col s4">
                <div className="row">
                    <div className="col s12">
                        <div className="card blue darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">{order.clientName}</span>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><span>Contacts : </span></td>
                                            <td><span>{order.clientPhone}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Mark</span></td>
                                            <td><span>{order.carMark}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Model</span></td>
                                            <td><span>{order.carModel}</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Odometr</span></td>
                                            <td><span>{order.carodometr}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span>Recomendation : </span>
                                <p style={{maxWidth: 150}}>{order.worksRecomendation}</p>
                            </div>
                            
                            <div className="card-action">
                                <button className="waves-effect waves-light btn red lighten-1" onClick={deleteOrder}>Delete Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col s8">
                <div style={{marginTop: 10}}>
                    <label htmlFor="workTableList">Works List</label>
                    <table id='workTableList'>
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Name</th>
                                <th>Time</th>
                                <th>Qty</th>
                                <th>Cost</th>
                                <th>Sum</th>
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

                    <label htmlFor="partsTableList">Parts List</label>
                    <table id='partsTableList'>   
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Parts Name</th>
                                <th>Article</th>
                                <th>Qty</th>
                                <th>Cost</th>
                                <th>Sum</th>
                            </tr>
                        </thead>

                        <tbody id='partsList'>
                            {Object.values(order.partsList[0]).map((partsLine, index) => {
                                console.log(partsLine.number)
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