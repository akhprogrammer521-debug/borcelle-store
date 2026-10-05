import { Card, Form, InputGroup, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const CouponCard = () => {
  const { t } = useTranslation();
  return (
    <Card className="border shadow-sm mb-3">
      <Card.Body>
        <Form.Label className="text-muted small fw-semibold">{t("cart.haveACoupon")}</Form.Label>
        <InputGroup>
          <Form.Control placeholder={t("cart.addCoupon")} size="sm" />
          <Button variant="" size="sm" className="fw-semibold border btn-cus-secondary">
            {t("common.apply")}
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
};

export default CouponCard;