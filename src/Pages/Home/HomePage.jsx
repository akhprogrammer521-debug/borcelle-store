import SubscribeSection from "../../Components/shared/SubscribeSection";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import CunsomerElectronic from "./components/CunsomerElectronic";
import DealOfferSection from "./components/DealOfferSection";
import HeroSection from "./components/HeroSection";
import HomeAndOutdoorSection from './components/HomeAndOutdoorSection';
import RecommendedItems from "./components/RecommendedItems";
import RegionSection from "./components/RegionSection";
import RequestSendingSection from "./components/RequestSendingSection";
import ServiceSection from "./components/SevicesSection";
import Reveal from "../../Components/shared/ScrollReveal";
const HomePage = () => {    
    return (
        <>
            <MainLayout>
                    <Reveal><HeroSection /></Reveal>
                    <Reveal><DealOfferSection /></Reveal>
                    <Reveal><HomeAndOutdoorSection /></Reveal>
                    <Reveal><CunsomerElectronic /></Reveal>
                    <RequestSendingSection />
                    <Reveal><RecommendedItems /></Reveal>
                    <Reveal><ServiceSection /></Reveal>
                    <Reveal><RegionSection /></Reveal>
                    <SubscribeSection />
            </MainLayout>
        </>
    )
}

export default HomePage
