import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [tokenExp, setTokenExp] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id, tokenExpiresIn) => {
        setToken(jwtToken)
        setUserId(id)
        setTokenExp(tokenExpiresIn)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, tokenExp: tokenExpiresIn
        }))

        if (tokenExpiresIn <= new Date().toISOString()) {
            setToken(null)
            setUserId(null)
            setTokenExp(null)
            localStorage.removeItem(storageName)
        }
    }, [])
    
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setTokenExp(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.tokenExp)
        } 
        setReady(true)
    }, [login])

    return {login, logout, token, userId, tokenExp, ready}
}