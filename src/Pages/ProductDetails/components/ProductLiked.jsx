const ProductLiked = ({ image, model, price1, price2 }) => {
    return (
        <div className="d-flex align-items-start gap-2">
            <div className="border p-2 rounded-2 bg-white flex-shrink-0">
                <img
                    src={image}
                    alt={model}
                    width={48}
                    height={48}
                    className="object-fit-contain"
                />
            </div>

            <div className="lh-sm" style={{ minWidth: 0 }}>
                <p className="mb-1 small">{model}</p>
                <p className="text-secondary small m-0">
                    ${Number(price1).toFixed(2)}
                    {price2 != null && ` - $${Number(price2).toFixed(2)}`}
                </p>
            </div>
        </div>
    );
};

export default ProductLiked;
