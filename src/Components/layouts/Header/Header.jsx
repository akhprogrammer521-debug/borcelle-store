import { useEffect, useState } from "react";
import PrimaryNavbar from "./PrimaryNavbar";
import TopNavbar from "./TopNavbar";

const Header = () => {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsFixed(window.scrollY > 200);

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

       return (
        <header className={isFixed ? "header-fixed" : ""}>
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
