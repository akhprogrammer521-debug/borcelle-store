import Layout from "../../../Layouts/ProfileLayout/Layout";
import { BsCaretLeftFill } from "react-icons/bs";
import { terms_conditions } from "../../../Data/TermsConditions";

const TermCondition = () => {
    return (
        <>
            <Layout
                headerProfile={
                    <div className="d-flex align-items-center gap-2">
                            <BsCaretLeftFill size={30} />
                            <span>Terms and condition</span>
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
                            {terms_conditions.map((term) => (
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