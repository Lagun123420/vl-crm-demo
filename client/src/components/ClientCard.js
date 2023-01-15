import React from "react";

export const ClientCard = ({client, deleteClient}) => {
    return(
        <> 
            <div className="row">
                <div className="col s12">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">{client.firstName}</span>
                            <p>Phone number : {client.phoneNumber}</p>
                        </div>
                        <div className="card-action">
                            <button className="waves-effect waves-light btn red lighten-1" onClick={deleteClient}>Delete Client</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}