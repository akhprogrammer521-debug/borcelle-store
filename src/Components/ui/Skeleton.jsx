import { Col, Row } from "react-bootstrap";

export const Skeleton = ({ className = "", style, circle = false }) => (
  <span
    aria-hidden="true"
    className={`skeleton ${circle ? "skeleton--circle" : ""} ${className}`}
    style={style}
  />
);

export const ProductCardSkeleton = ({ view = "grid" }) => {
  if (view === "list") {
    return (
      <div className="ui-card border p-3 bg-white rounded-2 d-flex gap-4 mb-3" aria-hidden="true">
        <Skeleton style={{ width: 150, height: 150, flexShrink: 0 }} />
        <div className="d-flex flex-column grow gap-3 py-1">
          <Skeleton style={{ width: "78%", height: "1.25rem" }} />
          <Skeleton style={{ width: "30%", height: "1.5rem" }} />
          <Skeleton style={{ width: "52%", height: "1rem" }} />
          <Skeleton style={{ width: "100%", height: "1rem" }} />
          <Skeleton style={{ width: "22%", height: "1rem" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="ui-card border bg-white rounded-2 h-100 overflow-hidden" aria-hidden="true">
      <Skeleton className="m-3" style={{ height: 220, display: "block" }} />
      <div className="border-top p-3 d-flex flex-column gap-3">
        <Skeleton style={{ width: "42%", height: "1.5rem" }} />
        <Skeleton style={{ width: "38%", height: "1rem" }} />
        <Skeleton style={{ width: "86%", height: "1rem" }} />
      </div>
    </div>
  );
};

export const ProductsListSkeleton = ({ view = "grid", count = 6 }) => (
  <>
    {view === "grid" ? (
      <Row className="g-3" aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <Col key={index} xs={12} sm={6} xl={4}>
            <ProductCardSkeleton view="grid" />
          </Col>
        ))}
      </Row>
    ) : (
      <div aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <ProductCardSkeleton key={index} view="list" />
        ))}
      </div>
    )}
  </>
);

export const ProductDetailsSkeleton = () => (
  <div className="border rounded-3 p-3 bg-white" aria-hidden="true">
    <Row className="g-3">
      <Col lg={4} md={5}>
        <Skeleton style={{ height: 340, display: "block" }} />
        <div className="d-flex gap-2 mt-3">
          {Array.from({ length: 5 }, (_, index) => <Skeleton key={index} style={{ width: 52, height: 52 }} />)}
        </div>
      </Col>
      <Col lg={5} md={7}>
        <div className="d-flex flex-column gap-3">
          <Skeleton style={{ width: "25%", height: "1rem" }} />
          <Skeleton style={{ width: "90%", height: "1.5rem" }} />
          <Skeleton style={{ width: "45%", height: "1rem" }} />
          <Skeleton style={{ height: 76 }} />
          <Skeleton style={{ width: "100%", height: 90 }} />
        </div>
      </Col>
      <Col lg={3}><Skeleton style={{ height: 270, display: "block" }} /></Col>
    </Row>
  </div>
);

export const CartContentSkeleton = () => (
  <div className="bg-white border rounded-3 p-3" aria-hidden="true">
    {Array.from({ length: 3 }, (_, index) => (
      <div key={index} className="d-flex gap-3 py-2">
        <Skeleton style={{ width: 60, height: 60, flexShrink: 0 }} />
        <div className="d-flex flex-column gap-2 grow">
          <Skeleton style={{ width: "72%", height: "1rem" }} />
          <Skeleton style={{ width: "48%", height: "0.875rem" }} />
          <Skeleton style={{ width: "34%", height: "2rem" }} />
        </div>
        <Skeleton style={{ width: 84, height: "1.25rem" }} />
      </div>
    ))}
  </div>
);

export const OrderSummarySkeleton = () => (
  <div className="border rounded-3 p-4 bg-white d-flex flex-column gap-3" aria-hidden="true">
    {Array.from({ length: 3 }, (_, index) => <Skeleton key={index} style={{ height: "1rem" }} />)}
    <Skeleton style={{ height: "2.5rem" }} />
  </div>
);
