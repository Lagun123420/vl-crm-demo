// import { request } from "express"
import React, {Component, useCallback, useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { Loader } from "../../components/loader/Loader"
import { AuthContext } from "../../context/AuthContext"
import {useHttp} from '../../hooks/http.hook'
import { useTranslation } from "react-i18next"


export const CreateOrderPage = () => {
    const {t} = useTranslation()

    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

    const [cars, setCars] = useState([])
    const [selectedCar, setSelectedCar] = useState(null)
    const [clients, setClients] = useState([])
    const [selectedClient, setSelectedClient] = useState(null)

    const [indexWorkList, setIndexWorkList] = useState(0)
    const [indexPartsList, setIndexPartsList] = useState(0)

    

    const [order, setOrder] = useState({
        // number: '',
        status: 'New order',
        worksList: '',
        partsList: '',
        worksSum: '',
        partsSum: '',
        totalSum: '',
        clientName: '',
        clientPhone: '',
        carOdometr: '',//
        worksRecomendation: '',//
        car: '',//
        client: ''//
    })

    const [worksList, setWorksList] = useState({
        workList__item: {
            number: '',
            workName: '',
            worksTimes: '',
            worksQty: '',
            workCost: '',
            workCostSum: ''
        }
    })
    const [partsList, setPartsList] = useState({
        partsList__item: {
            number: '',
            partsName: '',
            partsArticle: '',
            partsQty: '',
            partsCost: '',
            partsSum: ''
        }
    })

    const selectClient = event => {
        setSelectedClient({ ...selectedClient, client: [clients[event.target.value]._id] })
        setOrder({
            ...order, 
            client: [clients[event.target.value]._id],
            clientName: clients[event.target.value].firstName,
            clientPhone: clients[event.target.value].phoneNumber
        })
        
    }

    const selectCar = event => {
        setSelectedCar({...selectedCar, car: [cars[event.target.value]._id]})
        setOrder({
            ...order, 
            car: [cars[event.target.value]._id],
            carMark: cars[event.target.value].carMark,
            carModel: cars[event.target.value].carModel
        })
    }

    const getClientCars = useCallback(async () => {
        try {
            const fetchedCars = await request(`/api/car/clientCars/${selectedClient.client}`, "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setCars(fetchedCars)
            
            return(cars)
        } catch (error) {}

    }, [token, request])

    const getClients = useCallback(async () => {
        try {
            const fetchedClients = await request('/api/client', "GET", null, {
                Authorization: `Bearer ${auth.token}`
            })
            setClients(fetchedClients)
            return(fetchedClients)
        } catch (error) {}
    },[auth.token, request])

    useEffect(()=> {
        getClients()
        // getClientCars()
        window.M.updateTextFields()
    },[])

    useEffect(() => {
        getClientCars()
    }, [selectedClient])
    

    useEffect(()=> {
        window.M.updateTextFields()
    },[])

    useEffect(() => {
        if (document.readyState == 'complete') {
            var buttonWorks = document.querySelector('#addNewWorkLine')
            var buttonParts = document.querySelector('#addNewPartsLine')
            if (!isLoading) {
                    buttonWorks.click()
                    buttonParts.click()
                    setIsLoading(true)
            }
        }
    }, [isLoading])

    const changeHandler = event => {
        setOrder({ ...order, [event.target.name]: event.target.value })
    }

    const addNewWorkLine = event => {
        event.preventDefault()

        var parent = document.createElement('tr')
        let numberOfIndexWorkList = ''
        if (indexWorkList !== 0) {numberOfIndexWorkList = indexWorkList}
        parent.setAttribute('id', `workList__item${numberOfIndexWorkList}`)

        for (var i = 0; i <= 5; i++) {
            var element1 = document.createElement('input')
            element1.oninput = changeHandlerList
            element1.setAttribute('type', 'text')
            
            if (i === 0) {

                element1.setAttribute('value', `${indexWorkList + 1}`)    
                element1.setAttribute('readOnly', 'true')    
                element1.setAttribute('name', 'number')    
            } else if (i === 1) {
                element1.setAttribute('name', 'workName')
            } else if (i === 2) {
                element1.setAttribute('name', 'worksTimes')
            } else if (i === 3) {
                element1.setAttribute('name', 'worksQty')
            } else if (i === 4) {
                element1.setAttribute('name', 'workCost')
            } else if (i === 5) {
                element1.setAttribute('name', 'workCostSum')
            } else {
                element1.setAttribute('value', ' ')
            }

            var element = document.createElement('td')
            element.appendChild(element1)
            parent.appendChild(element)
        }

        document.querySelector('tbody#workList').appendChild(parent)
        
        setIndexWorkList(indexWorkList + 1);
    }

    const addNewPartsLine = event => {
        event.preventDefault()

        let numberOfIndexPartsList = ''
        if (indexPartsList !== 0) {numberOfIndexPartsList = indexPartsList;}
        var parent = document.createElement('tr')
        parent.setAttribute('id', `partsList__item${numberOfIndexPartsList}`)

        for (var i = 0; i <= 5; i++) {
            var element1 = document.createElement('input')
            element1.oninput = changeHandlerList
            element1.setAttribute('type', 'text')
            
            if (i === 0) {
                element1.setAttribute('value', `${indexPartsList + 1}`)
                element1.setAttribute('readOnly', 'true')  
                element1.setAttribute('name', 'number')    
            } else if (i === 1) {
                element1.setAttribute('name', 'partsName')
            } else if (i === 2) {
                element1.setAttribute('name', 'partsArticle')
            } else if (i === 3) {
                element1.setAttribute('name', 'partsQty')
            } else if (i === 4) {
                element1.setAttribute('name', 'partsCost')
            } else if (i === 5) {
                element1.setAttribute('name', 'partsSum')
            } else {
                element1.setAttribute('value', ' ')
            }

            var element = document.createElement('td')
            element.appendChild(element1)
            parent.appendChild(element)
        }

        document.querySelector('tbody#partsList').appendChild(parent)
        
        setIndexPartsList(indexPartsList + 1)
        
    }

    const changeHandlerList = (e) => {
        e.preventDefault()

        const parrentId = e.target.offsetParent.offsetParent.id
        const pathEvent = e.target.parentElement.parentElement.id

        let allInput = document.querySelectorAll(`#${pathEvent} td input`)

        let time;
        let workCost;
        let workQty;
        let partsQty;
        let partsCost;

        allInput.forEach(e => 
            {   
                if (e.name === 'worksTimes') {
                    return (time = e.value)
                }

                if (e.name === 'worksQty') {
                    return (workQty = e.value)
                } 

                if (e.name === 'workCost') {
                    return (workCost = e.value)
                }

                if (e.name === 'workCostSum') {
                    e.setAttribute('value', `${time * workCost * workQty}`)
                    window.M.updateTextFields()
                }

                if (e.name === "partsQty") {
                    return (partsQty = e.value)
                }
                if (e.name === "partsCost") {
                    return(partsCost = e.value)
                }
                if (e.name === "partsSum") {
                    e.setAttribute('value', `${partsQty * partsCost}`)
                }
            }
        )

        allInput.forEach(e =>
            {if (parrentId === 'workTableList') {
                setWorksList((prevState) => ({
                    ...prevState,
                    [pathEvent]: {
                    ...prevState[pathEvent],
                    [e.name]: e.value
                    }
                }))        
            } else if (parrentId === 'partsTableList') {
                setPartsList((prevState) => ({
                    ...prevState,
                    [pathEvent]: {
                    ...prevState[pathEvent],
                    [e.name]: e.value
                    }
                }))
            } }
        ); 
        
    }

    useEffect(() => {
        setOrder({...order, worksList, partsList})
    }, [worksList, partsList])

    const createHandler = async (e) => {
        e.preventDefault();
        // setOrder({...order, worksList, partsList})
        try {
            const data = await request('/api/order/create-order/', "POST", {...order}, {Authorization: `Bearer ${auth.token}`})
            // navigate(`/clientOrders/${data.order._id}`)
            navigate(`/orders`)
        } catch (error) {}
        // console.log({...order})
    }

    return (
        <div className="row">
            <form className='col s12'>
                <div className="col s8 offset-s2">
                    <h5>{t("Create Order")}</h5>
                </div>
                <div className="col s8 offset-s2">
                    <label>{t("Select client")}</label>
                    <select className="browser-default" defaultValue={"DEFAULT"} onChange={selectClient}>
                        <option disabled value={"DEFAULT"}>{t("Select client")}</option>
                        {clients.map((client, index) => {
                            return(
                                <option key={client._id} value={index}>{client.firstName} {client.phoneNumber}</option>
                            )
                        })}
                    </select>
                </div>
                {selectedClient && cars &&
                <div className="col s8 offset-s2">
                    <label>{t("Select Car")}</label>
                    <select className="browser-default" defaultValue={"DEFAULT"} onChange={selectCar}>
                        <option disabled value={"DEFAULT"}>{t("Select Car")}</option>
                        {cars.map((car, index) => {
                            return(
                                <option key={car._id} value={index}>{car.carMark} {car.carModel}</option>
                            )
                        })}
                    </select>
                </div>}
                
                <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                    <div className="input-field">
                        <input 
                            id="carOdometr"
                            type="text" 
                            name='carOdometr'
                            onChange={changeHandler}
                        />
                        <label htmlFor="carOdometr">{t("Car Odometr")}</label>
                    </div>
                    
                    <label htmlFor="workTableList">{t("Works List")}</label>
                    <table id='workTableList'>
                        <thead>
                            <tr>
                                <th>{t("Numb")}</th>
                                <th>{t("Name")}</th>
                                <th>{t("Time")}</th>
                                <th>{t("Qty")}</th>
                                <th>{t("Cost")}</th>
                                <th>{t("Sum")}</th>
                            </tr>
                        </thead>

                        <tbody id='workList'></tbody>
                    </table>
                    
                    <div style={{marginTop: 5}}>
                        <button 
                            id="addNewWorkLine"
                            className="waves-effect waves-light btn-small" 
                            onClick={addNewWorkLine}
                            onSubmit={null}
                            >{t("Create new line")}</button>
                    </div>
                
                    <label htmlFor="partsTableList">{t("Parts List")}</label>
                    <table id='partsTableList'>   
                        <thead>
                            <tr>
                                <th>{t("Numb")}</th>
                                <th>{t("Parts Name")}</th>
                                <th>{t("Article")}</th>
                                <th>{t("Qty")}</th>
                                <th>{t("Cost")}</th>
                                <th>{t("Sum")}</th>
                            </tr>
                        </thead>

                        <tbody id='partsList'>
                        </tbody>
                    </table>
                    
                    <div style={{marginTop: 5}}>
                        <button
                            id="addNewPartsLine" 
                            className="waves-effect waves-light btn-small" 
                            onClick={addNewPartsLine}
                            >{t("Create new line")}
                        </button>
                    </div>

                    
                    <div className="input-field">
                        <input 
                            id="worksRecomendation" 
                            type="text" 
                            name='worksRecomendation'
                            onChange={changeHandler}
                        />
                        <label htmlFor="worksRecomendation">{t("Recomendation")}</label>
                    </div>
                    <div className="card-action">
                        <button 
                            className='btn yellow darken-4' 
                            style={{marginRight:10}}
                            onClick={createHandler}
                        >{t("Create")}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}