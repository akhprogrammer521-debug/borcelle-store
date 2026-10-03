import Layout from "../../../Layouts/ProfileLayout/Layout";
import { BsCaretLeftFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { SettingApi } from "../../../services/SettingApi";

const PrivacyPolicy = () => {

    const [privacyPolicy, setPrivacyPolicy] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        SettingApi.GetPrivacyPolicyService()
            .then((data) => {
                console.log(data)
                setPrivacyPolicy(data.data || null);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return (
    <Layout
      headerProfile={
        <div className="profile-title d-flex align-items-center gap-2">
          <BsCaretLeftFill size={30} />
          <span>Privacy & Policy</span>
        </div>
      }
      bodyProfile={
        <div className="overflow-hidden" style={{ maxHeight: "650px" }}>
          {loading && <p>Loading...</p>}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {privacyPolicy && (
            <div
              className="overflow-y-auto px-4"
              style={{ maxHeight: "650px" }}
            >
              <div className="py-4 border-bottom">
                <h4 className="mb-3 text-danger">
                  Privacy policy
                </h4>

                <p className="mb-0 text-secondary">
                  {privacyPolicy.value}
                </p>
              </div>
            </div>
          )}
        </div>
      }
    />
    )
}

export default PrivacyPolicy
