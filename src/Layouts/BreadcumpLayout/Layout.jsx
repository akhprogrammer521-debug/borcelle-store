import { Container } from "react-bootstrap";
import MainLayout from "../MainLayout/MainLayout";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from "react-i18next";

const Layout = ({ children }) => {
  const { t } = useTranslation();
    return (
        <>
            <MainLayout>
                <div className="">
                    <Container>
                        <Breadcrumb>
                            <Breadcrumb.Item href="#">{t("common.home")}</Breadcrumb.Item>
                            <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                {t("common.library")}
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>{t("common.data")}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Container>
                    {children}
                </div>
            </MainLayout>
        </>
    )
}

export default Layout
