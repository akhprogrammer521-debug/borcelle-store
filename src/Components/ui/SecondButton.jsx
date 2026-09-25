const SecondButton = ({
    value,
    onClick,
    className = "",
    isLoading = false,
    loadingLabel = "Loading...",
    ...buttonProps
}) => {
    return (
        <button
            className={`btn-cus-secondary border-0 px-3 py-1 w-100 rounded-3 ${className}`}
            onClick={onClick}
            disabled={isLoading || buttonProps.disabled}
            aria-busy={isLoading}
            {...buttonProps}
        >
            {isLoading ? loadingLabel : value}
        </button>
    );
};

export default SecondButton;