import PrimaryNavbar from "./PrimaryNavbar";
import TopNavbar from "./TopNavbar";

const Header = () => {
    return (
        <header>
            <div>
                <TopNavbar />
                <div className="border-bottom"></div>
                <PrimaryNavbar />
                <div className="border-bottom"></div>
            </div>
        </header>
    )
}

export default Header
