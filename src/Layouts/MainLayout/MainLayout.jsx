import Footer from "../../Components/layouts/Footer/Footer";
import Header from "../../Components/layouts/Header/Header";

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="bg-light">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default MainLayout
