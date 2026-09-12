import iPhone from '../../assets/products_tech/image 33.png'
const ProductCardList = () => {
    return (
        <>
            <div className="border rounded-2  p-2">
                <div className="d-flex flex-column">
                        <img src={iPhone} alt="" width={50}/>
                    <div className="border-bottom"></div>
                </div>
            </div>
        </>
    )
}

export default ProductCardList
