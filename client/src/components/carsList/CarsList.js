import React from "react";
import { Link } from "react-router-dom";

export const CarsList = ({cars}) => {
    if (!cars.length) {
        return (
            <>
                <div>
                    <p>Haven't cars</p>
                </div>
            </>
        )
    }

    return(
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Mark</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Engine</th>
                    <th>Number</th>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Client</th>
                    <th>User</th>
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
                            <td><Link to={`/detailCar/${car._id}`} className="waves-effect waves-light btn blue lighten-1">Open</Link></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}