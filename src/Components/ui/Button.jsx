const Button = ({ value, onClick, className = "", ...props }) => {
    return (
        <>
            <button 
            onClick={onClick} 
            {...props} 
            className={`btn-cus border-0 px-3 py-1 w-100 rounded-3 ${className}`}>{value}</button>
        </>
    )
}

export default Button



