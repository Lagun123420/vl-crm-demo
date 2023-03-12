import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const CarsList = ({cars}) => {

    const {t} = useTranslation()

    if (!cars.length) {
        return (
            <>
                <div>
                    <p>{t("Haven't cars")}</p>
                </div>
            </>
        )
    }

    return(
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>{t("Mark")}</th>
                    <th>{t("Model")}</th>
                    <th>{t("Year")}</th>
                    <th>{t("Engine")}</th>
                    <th>{t("Number")}</th>
                    <th>{t("VIN")}</th>
                    <th>{t("Color")}</th>
                    <th>{t("Client")}</th>
                    <th>{t("User")}</th>
                </tr>
            </thead>

            <tbody>
                {cars.map((car, index) => {
                    return(
                        <tr key={car._id}>
                            <td>{index + 1}</td>
                            <td>{car.carMark}</td>
                            <td>{car.carModel}</td>
                            <td>{car.carYear}</td>
                            <td>{car.carEngine}</td>
                            <td>{car.carNumber}</td>
                            <td>{car.carVinCode}</td>
                            <td>{car.carColor}</td>
                            <td>client</td>
                            <td>user</td>
                            {/* <td>{car.client}</td> */}
                            {/* <td>{car.owner}</td> */}
                            <td><Link to={`/detailCar/${car._id}`} className="waves-effect waves-light btn blue lighten-1">{t("Open")}</Link></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}