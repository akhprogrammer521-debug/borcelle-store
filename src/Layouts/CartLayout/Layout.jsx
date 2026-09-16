import Footer from "../../Components/layouts/Footer/Footer";
import TopNavbar from "../../Components/layouts/Header/TopNavbar";

const Layout = ({ children }) => {
    return (
        <>
            <TopNavbar />
            <div className="bg-light">
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout
