import LoadingButton from "./LoadingButton";

const Button = ({ value, onClick, className = "", isLoading = false, loadingLabel, ...props }) => (
    <LoadingButton
        onClick={onClick}
        isLoading={isLoading}
        loadingLabel={loadingLabel}
        {...props}
        className={`btn-cus border-0 px-3 py-1 w-100 rounded-3 ${className}`}
    >
        {value}
    </LoadingButton>
);

export default Button



