import React from "react";
import { Link } from "react-router-dom";

export const OrdersList = ({orders}) => {
    // console.log(orders)
    if (!orders.length) {
        return (
            <>
                <div>
                    <p>Haven't orders</p>
                </div>
            </>
        )
    }

    console.log(orders)

    return(
        <table>
        <thead>
          <tr>
              <th>Number</th>
              <th>Client name</th>
              <th>Client phone</th>
              <th>Car mark</th>
              <th>Car model</th>
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
            })}
        </tbody>
      </table>
    )
}