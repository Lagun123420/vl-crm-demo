import React from "react";
import { Link } from "react-router-dom";
import cl from './clientsList.module.css'

export const ClientsList = ({clients}) => {
    if (!clients.length) {
        return (
            <>
                <div>
                    <p>Haven't clients</p>
                </div>
            </>
        )
    }

    return(
        <table>
        <thead>
          <tr>
              <th>№</th>
              <th>First Name</th>
              <th>Phone Number</th>
          </tr>
        </thead>

        <tbody>
            {clients.map((client, index) => {
                return(
                    <tr key={client._id}>
                        <td>{index + 1}</td>
                        <td>{client.firstName}</td>
                        <td>{client.phoneNumber}</td>
                        <td className={cl.buttons}><Link className={cl.button_open} to={`/detail/${client._id}`}>Open</Link></td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    )
}