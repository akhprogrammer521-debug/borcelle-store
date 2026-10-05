import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const CartHeaderActions = () => {
  const { t } = useTranslation();

  const navigateTo = useNavigate();

  const handleBackToShop = () => {
    navigateTo("/products");
  };
  
  return (
    <div className="d-flex justify-content-between align-items-center my-3">
      <Button variant="primary" className="d-flex align-items-center gap-2 fw-semibold px-3 btn-cus" onClick={handleBackToShop}>
        <FaArrowLeft /> {t("nav.backToShop")}
      </Button>
    </div>
  );
};

export default CartHeaderActions;