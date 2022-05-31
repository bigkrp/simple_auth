import { createContext, useEffect, useState } from "react"
import { isAuth as isAuthApi } from "../api/auth.js"
import LoginComponent from "./LoginComponent.js"

export const AuthContext = createContext({})

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await isAuthApi()
                setUser(user)
            } catch (error) {
                console.error(error)                
                setUser(null)
            }
        }

        checkAuth()
    }, [])

    const isAuth = Boolean(user)

    return (
        <AuthContext.Provider value={{isAuth: Boolean(user), userData: user, setUser}}>
            {isAuth && children}
            {!isAuth && <LoginComponent />}
        </AuthContext.Provider>
    )
}

export default AuthProvider