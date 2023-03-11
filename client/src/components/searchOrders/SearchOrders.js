import { useCallback } from "react"

export const SearchOrders = () => {
    // const fetchOrders = useCallback(async () => {
    //     try {
    //         const fetched = await request('/api/order', "GET", null, {
    //             Authorization: `Bearer ${token}`
    //         })
    //         setOrders(fetched)
    //         return(fetched)
    //     } catch (error) {
            
    //     }
    // }, [token, request] )
    return(
        <>
            {/* <span>123</span> */}
            <div className="row">
                <div className="input-field col s6">
                    <i className="material-icons prefix">search</i>
                    <input id="icon_prefix" type="text" className="validate"/>
                    <label for="icon_prefix">Search by phone</label>
                </div>
            </div>
        </>
    )
}