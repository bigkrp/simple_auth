import { useContext } from "react"
import "./style.css"

import Button from "ui/Button/component"
import { AuthContext } from "components/AuthProvider"
import { COOKIE_KEY } from "config"

export default function TopBar() {
    const {setUser} = useContext(AuthContext)

    const logout = () => {
        document.cookie = `${COOKIE_KEY}=''; expires = Thu, 01 Jan 1970 00:00:00 GMT`
        setUser(null)
    }

    return (
        <nav className="TopBar">
            <strong className="TopBar-title">Nice to meet you here</strong>
            <Button onClick={logout}>Logout</Button>
        </nav>
    )
}