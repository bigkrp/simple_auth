import { useContext, useState } from "react"
import Form, { FormHeader, FormSubmit } from "ui/Form"
import { register, login } from "../api/auth.js"
import { AuthContext } from "./AuthProvider.js"

const EMAIL_NAME = 'email'
const PASSWORD_NAME = 'password'

const LoginComponent = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [formState, setFormState] = useState(new Map())
    const {setUser} = useContext(AuthContext)

    const onClick = (event) => {
        event.preventDefault()
        setIsRegister((isRegister) => !isRegister)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        const fetchApi = async () => {
            if (isRegister) {
                 await register({
                    email: formState.get(EMAIL_NAME),
                    password: formState.get(PASSWORD_NAME)
                })
            } else {
                const data = await login({
                    email: formState.get(EMAIL_NAME),
                    password: formState.get(PASSWORD_NAME)
                })
                setUser(data)
            }
        }

        fetchApi()
    }

    const onChange = (event) => {
        const newFormState = new Map(formState)
        newFormState.set(event.target.name, event.target.value)
        setFormState(newFormState)
    }

    return (
        <Form onSubmit={onSubmit}>
            <FormHeader>{isRegister ? 'Registration' : 'Login'}</FormHeader>
            <fieldset>
                <legend>{isRegister ? 'Enter email and password to register' : 'Enter email and password to login'}</legend>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name={EMAIL_NAME} onChange={onChange} />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name={PASSWORD_NAME} onChange={onChange} />
            </fieldset>
            <FormSubmit type="submit">Submit</FormSubmit>
            <a href={isRegister ? '#login' : '#registration'} onClick={onClick}>{isRegister ? 'Go to login' : 'Go to registartion'}</a>
        </Form>
    )
}

export default LoginComponent