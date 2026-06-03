import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";

export default function TourPackageBreadcrumb() {
    const navigate = useNavigate();

    const items = [
        {
            label: "Create Tour Package",
            command: () => navigate("/tour-packages")
        },
    ];

    const home = {
        label: "Tour packages",
        command: () => navigate("/tour-packages")
    };

    return (
        <BreadCrumb
            model={items}
            home={home}
            className="tour-breadcrumb px-2 py-2"
        />
    );
}