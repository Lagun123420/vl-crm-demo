import { useState, useCallback } from "react"


export const useHttp = () => {
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        
        setLoading(true)
        try {
            
            if (body) {
                body = JSON.stringify(body)
                headers['Content-type'] = 'application/json'
            }

            // console.log(123)
            const responce = await fetch(url, {method, body, headers})
            
            const data = await responce.json()

            if (!responce.ok) {
                throw new Error(data.message || 'Do somethink error')
            }
            
            setLoading(false)

            return data


        } catch (error) {
            
            setLoading(false)
            setError(error.message)
            throw error
        }
    })

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}