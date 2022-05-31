import Button from 'ui/Button'
import './style.css'

export const FormHeader = ({children}) => (
    <h1 className="FormHeader">{children}</h1>
)

export const FormSubmit = ({children}) => <Button className="FormSubmit" type="submit">{children}</Button>


export default function Form({children, onSubmit}) {
    return (
        <form className="Form" onSubmit={onSubmit}>
            {children}
        </form>
    )
}