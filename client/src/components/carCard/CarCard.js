import React from "react";
import { useTranslation } from "react-i18next"

export const CarCard = ({car, deleteCar}) => {
    const {t} = useTranslation()

    return(
        <>
            <div className="container">
            <div className="row">
                <div className="col s8">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title small">{car.carMark}</span>
                            
                            <table>
                                <tbody>
                                    <tr>
                                        <td><span>{t("Model")} : </span></td>
                                        <td><span>{car.carModel}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>{t("Year")} : </span></td>
                                        <td><span>{car.carYear}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>{t("Engine")} : </span></td>
                                        <td><span>{car.carEngine}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>{t("Reg Number")} : </span></td>
                                        <td><span>{car.carNumber}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>{t("VIN code")} : </span></td>
                                        <td><span>{car.carVinCode}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>{t("Color")} : </span></td>
                                        <td><span>{car.carColor}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="card-action">
                            <button className="waves-effect waves-light btn red lighten-1" onClick={deleteCar}>{t("Delete Car")}</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}