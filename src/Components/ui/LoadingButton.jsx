import { Spinner } from "react-bootstrap";

const LoadingButton = ({
  isLoading = false,
  loadingLabel,
  children,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  const accessibleLabel = loadingLabel || props["aria-label"] || "Loading";

  return (
    <button
      {...props}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      aria-label={isLoading ? accessibleLabel : props["aria-label"]}
      className={`loading-button position-relative ${className}`}
    >
      <span className={isLoading ? "invisible" : undefined}>{children}</span>
      {isLoading && (
        <span className="loading-button__spinner" aria-hidden="true">
          <Spinner animation="border" size="sm" />
        </span>
      )}
    </button>
  );
};

export default LoadingButton;
