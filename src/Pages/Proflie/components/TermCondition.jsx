import Layout from "../../../Layouts/ProfileLayout/Layout";
import { BsCaretLeftFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const TermCondition = () => {
    const { t } = useTranslation();

    const termsConds = [
        { id: 1, title: "Acceptance of Terms", desc: "By using this application, you acknowledge that you have read, understood, and agree to fully comply with these terms. If you do not agree with these terms, please do not use the application. The application management reserves the right to modify these terms at any time, and you will be notified of updates when necessary." },
        { id: 2, title: "Account Creation and Use", desc: "By using this application, you acknowledge that you have read, understood, and agree to fully comply with these terms. If you do not agree with these terms, please do not use the application. The application management reserves the right to modify these terms at any time, and you will be notified of updates when necessary." },
        { id: 3, title: "Acceptance of Terms", desc: "By using this application, you acknowledge that you have read, understood, and agree to fully comply with these terms. If you do not agree with these terms, please do not use the application. The application management reserves the right to modify these terms at any time, and you will be notified of updates when necessary." },
        { id: 4, title: "Intellectual Property Rights", desc: "By using this application, you acknowledge that you have read, understood, and agree to fully comply with these terms. If you do not agree with these terms, please do not use the application. The application management reserves the right to modify these terms at any time, and you will be notified of updates when necessary." },
        { id: 5, title: "Acceptance of Terms", desc: "By using this application, you acknowledge that you have read, understood, and agree to fully comply with these terms. If you do not agree with these terms, please do not use the application. The application management reserves the right to modify these terms at any time, and you will be notified of updates when necessary." },
    ]

    return (
        <>
            <Layout
                headerProfile={
                    <div className="profile-title d-flex align-items-center gap-2">
                        <BsCaretLeftFill size={30} />
                        <span>{t("profile.termsAndCondition")}</span>
                    </div>
                }

                bodyProfile={
                    <div
                        className="overflow-hidden"
                        style={{ maxHeight: "650px" }}
                    >
                        <div
                            className="overflow-y-auto px-4"
                            style={{ maxHeight: "650px" }}
                        >
                            {termsConds.map((term) => (
                                <div
                                    key={term.id}
                                    className="py-4 border-bottom"
                                >
                                    <h4 className="mb-3 text-danger">
                                        {term.title}
                                    </h4>

                                    <p className="mb-0 text-secondary">
                                        {term.desc}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>
                }
            />
        </>
    );
};

export default TermCondition;