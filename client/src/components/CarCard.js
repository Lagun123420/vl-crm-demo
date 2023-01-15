import React from "react";

export const CarCard = ({car, deleteCar}) => {
    return(
        <>
            <div className="container">
            <div className="row">
                <div className="col s8">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">{car.carMark}</span>

                            <table>
                                <tbody>
                                    <tr>
                                        <td><span>Model : </span></td>
                                        <td><span>{car.carModel}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>Year : </span></td>
                                        <td><span>{car.carYear}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>Engine : </span></td>
                                        <td><span>{car.carEngine}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>Reg Number : </span></td>
                                        <td><span>{car.carNumber}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>VIN code : </span></td>
                                        <td><span>{car.carVinCode}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span>Color : </span></td>
                                        <td><span>{car.carColor}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="card-action">
                            <button className="waves-effect waves-light btn red lighten-1" onClick={deleteCar}>Delete Car</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}