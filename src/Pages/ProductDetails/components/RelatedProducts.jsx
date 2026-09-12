const RelatedProducts = ({ image, model, price1, price2 }) => {
    return (
        <div className="d-flex flex-column h-100">
            <div
                className="p-2 rounded-2 bg-light d-flex justify-content-center align-items-center mb-2"
                style={{ height: "140px" }}
            >
                <img
                    src={image}
                    alt={model}
                    className="img-fluid object-fit-contain"
                    style={{ maxHeight: "120px" }}
                />
            </div>

            <p className="text-secondary small mb-1">{model}</p>
            <p className="text-secondary small mb-0 mt-auto">
                ${Number(price1).toFixed(2)}
                {price2 != null && ` - $${Number(price2).toFixed(2)}`}
            </p>
        </div>
    );
};

export default RelatedProducts;
