import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";

const breadcrumbNames = {
    admin: "common.admin",
    products: "common.products",
    categories: "common.categories",
    users: "common.users",
    create: "common.create",
    edit: "common.edit",
    library: "common.library",
    data: "common.data",
};


const BreadcumpBar = () => {

    const { t } = useTranslation();
    const { pathname } = useLocation();

    const paths = pathname.split("/").filter(Boolean);

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                {t("common.home")}
            </Breadcrumb.Item>

            {paths.map((path, index) => {
                const isLast = index === paths.length - 1;
                const link = `/${paths.slice(0, index + 1).join("/")}`;

                // إذا كان الجزء ID رقميًا
                const isId = /^\d+$/.test(path);

                const title = isId
                    ? `${t("common.details")} #${path}`
                    : t(breadcrumbNames[path] || path);

                return (
                    <Breadcrumb.Item
                        key={link}
                        active={isLast}
                        linkAs={isLast ? undefined : Link}
                        linkProps={isLast ? undefined : { to: link }}
                    >
                        {title}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    )
}

export default BreadcumpBar