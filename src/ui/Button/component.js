import "./style.css"

export const ButtonSmall = ({onClick, children, className, ...props}) => (
    <button className={`ButtonSmall ${className}`} onClick={onClick} {...props}>
        {children}
    </button>
)

export default function Button({onClick, children, className, ...props}) {
    return <button className={`Button ${className}`} onClick={onClick} {...props}>
        {children}
    </button>
}