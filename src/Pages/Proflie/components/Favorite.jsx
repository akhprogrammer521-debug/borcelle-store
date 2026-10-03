import { BsCaretLeftFill } from "react-icons/bs";
import Layout from "../../../Layouts/ProfileLayout/Layout";
import { Col, Row } from "react-bootstrap";
import { FavContext } from "../../../Contexts/FavouriteContext";
import { useContext } from "react";

const Favorite = () => {

    const { favourite } = useContext(FavContext);

    const favorites = Array.isArray(favourite) ? favourite : [];

    const favoriteProducts = favorites.filter(
        (favorite) => favorite.product
    );

    return (
        <Layout
            headerProfile={
                <div className="profile-title d-flex align-items-center gap-2">
                    <BsCaretLeftFill size={30} />
                    <span>Favorites</span>
                </div>
            }
            bodyProfile={
                <div className="profile-body p-3">
                    <Row>
                        <Col>
                            {favoriteProducts.length === 0 ? (
                                <div className="text-center">
                                    <p>No favorite products found.</p>
                                </div>
                            ) : (
                                <Row>
                                    {favoriteProducts.map((favorite) => {
                                        const product = favorite.product;

                                        return (
                                            <Col md={4}>
                                                <div key={favorite.id} className="card">
                                                    {product.image && (
                                                        <img
                                                            src={product.image}
                                                            className="card-img-top"
                                                            alt={product.name}
                                                            width={50}
                                                        />
                                                    )}

                                                    <div className="card-body">
                                                        <h5 className="card-title">{product.name}</h5>

                                                        <p className="card-text">
                                                            ${Number(product.price).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            )}
                        </Col>
                    </Row>
                </div>
            }
        />

    )
}

export default Favorite
