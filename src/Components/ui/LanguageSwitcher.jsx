import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { BsGlobe2 } from "react-icons/bs";

const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();

    const currentLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";
    const nextLanguage = currentLanguage === "en" ? "ar" : "en";

    useEffect(() => {
        document.documentElement.lang = currentLanguage;
        document.documentElement.dir =
            currentLanguage === "ar" ? "rtl" : "ltr";
    }, [currentLanguage]);

    const changeLanguage = () => {
        i18n.changeLanguage(nextLanguage);
    };

    return (
        <Button
            variant="outline-dark"
            onClick={changeLanguage}
            className="custom-nav-link border-0 d-flex flex-column gap-0 bg-transparent"
            aria-label={t("nav.changeLanguageTo", { language: t(nextLanguage === "ar" ? "nav.arabic" : "nav.english") })}
        >
            <BsGlobe2 size={19} />
            <span className="mt-1">
                {nextLanguage === "ar" ? "AR" : "EN"}
            </span>
        </Button>
    );
};

export default LanguageSwitcher;
