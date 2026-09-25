import { Container } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Layout = ({ children }) => {
    return (
        <>
            <MainLayout>
                <div className="">
                    <Container>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                Library
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>Data</Breadcrumb.Item>
                        </Breadcrumb>
                    </Container>
                    {children}
                </div>
            </MainLayout>
        </>
    )
}

export default Layout
