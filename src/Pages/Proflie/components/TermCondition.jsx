import Layout from "../../../Layouts/ProfileLayout/Layout";
import { BsCaretLeftFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { SettingService } from "../../../services/SettingService";
import { useTranslation } from "react-i18next";

const TermCondition = () => {
  const { t } = useTranslation();

    const [termsConds, setTermsConds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        SettingService.GEtTermsCondsApi()
            .then((data) => {
                setTermsConds(Array.isArray(data.data) ? data.data : []);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    
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
                        {loading && <p>{t("common.loading")}</p>}
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
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default TermCondition;