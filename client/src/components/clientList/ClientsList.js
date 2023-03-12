import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"
import cl from './clientsList.module.css'


export const ClientsList = ({clients}) => {
    const {t} = useTranslation()

    if (!clients.length) {
        return (
            <>
                <div>
                    <p>{t("Haven't clients")}</p>
                </div>
            </>
        )
    }

    return(
        <table>
        <thead>
          <tr>
              <th>№</th>
              <th>{t("First name")}</th>
              <th>{t("Phone number")}</th>
          </tr>
        </thead>

        <tbody>
            {clients.map((client, index) => {
                return(
                    <tr key={client._id}>
                        <td>{index + 1}</td>
                        <td>{client.firstName}</td>
                        <td>{client.phoneNumber}</td>
                        <td className={cl.buttons}><Link className={cl.button_open} to={`/detail/${client._id}`}>{t("Open")}</Link></td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    )
}