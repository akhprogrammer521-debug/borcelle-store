import { useNavigate } from "react-router";
import { Container, Row } from "react-bootstrap";

const ShopSection = () => {
    
    const navigateTo = useNavigate()

    const handleButton = ()=>{
        navigateTo("/products");
    } 
    return (
        <>
            <Container>
                <Row>
                    <div className="rounded-3 bg-cus p-0  h-25 my-3">
                        <div className="cube-bg p-3 rounded-start-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="lh-1 cube-bg">
                                    <p className="fw-bold text-white">Super discount on more than 100 USD</p>
                                    <p className="text-light">Have you ever finally just write dummy info</p>
                                </div>
                                <div>
                                    <button className="bg-orange p-2 border-0 rounded-2 text-light" onClick={handleButton}>Shop now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>

            </Container>
        </>
    )
}

export default ShopSection
