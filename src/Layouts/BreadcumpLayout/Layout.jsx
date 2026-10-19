import { Container } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import BreadcumpBar from "../../Components/shared/BreadcumpBar";

const Layout = ({ children }) => {
    return (
        <>
            <MainLayout>
                <div className="">
                    <Container>
                        <BreadcumpBar />
                    </Container>
                    {children}
                </div>
            </MainLayout>
        </>
    )
}

export default Layout
