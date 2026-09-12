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
const HomePage = () => {    
    return (
        <>
            <MainLayout>
                    <HeroSection />
                    <DealOfferSection />
                    <HomeAndOutdoorSection />
                    <CunsomerElectronic />
                    <RequestSendingSection />
                    <RecommendedItems />
                    <ServiceSection />
                    <RegionSection />
                    <SubscribeSection />
            </MainLayout>
        </>
    )
}

export default HomePage
