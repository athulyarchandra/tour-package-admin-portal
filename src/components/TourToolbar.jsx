import { Button } from "primereact/button";
import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useFilter } from "./contexts/FilterContext";

export default function TourToolbar() {
    const [showOverlay, setShowOverlay] = useState(false);
    const navigate = useNavigate()

    const { resetFilters } = useFilter();
    return (
        <div className="flex justify-content-between align-items-center pb-3">

            {/* Left Section */}
            <div className="flex align-items-center gap-2">

                <Button
                    label="Tour Package"
                    severity="contrast"
                    size="small"
                />
                <Button
                    icon="pi pi-info-circle"
                    rounded
                    text
                    severity="secondary"
                    style={{
                        fontSize: "1.3rem",
                        cursor: "pointer"
                    }}
                    onClick={() => setShowOverlay(true)}
                />

            </div>

            {/* Right Section */}
            <div className="flex align-items-center gap-2">

                <Button
                    label="Create Tour Package"
                    onClick={() => navigate("/dashboard/tour-package/create-tour-Package")}
                    style={{ backgroundColor: "#FFD500", color: "black" }}
                />

                <Button
                    icon="pi pi-refresh"
                    style={{
                        backgroundColor: "#1B1B1B",
                        color: "#FFD500",
                        fontWeight: "700"
                    }}
                    onClick={resetFilters}
                />

            </div>
            <Modal
                visible={showOverlay}
                onClose={() => setShowOverlay(false)}
                title="Tour Packages"
            >



                <p style={{ fontSize: "13px" }}>A tour package is a comprehensive bundle of travel services and experiences offered to travelers at a predetermined price. Options range from customizable pay-as-you-go services to fixed-price packages. Typically, these packages include:</p>
                <ol style={{ fontSize: "13px" }}>
                    <li>Transportation - Airfare, cruises, or ground transport.</li>
                    <li>Accommodation - Hotel stays or other lodging options.</li>
                    <li>Meals - Breakfast, lunch, or dinner options as per the package.</li>
                    <li>Activities - Guided tours, entrance fees to attractions, or adventure experiences.</li>
                    <li>Itinerary - A structured schedule detailing daily activities and experiences.</li>
                </ol>


                <p style={{ fontSize: "13px" }}>
                    Tour packages can vary in length, from single-day excursions to multi-day adventures, providing travelers with a convenient, all-in-one solution that simplifies planning and often reduces costs compared to booking each component separately.

                </p>
                <p style={{ fontSize: "13px" }}>
                    Our data tables showcase a variety of packages, featuring both international and domestic destinations accessed by bus, cruise, or caravan. Users can easily sort column values and utilize multiple filters above the table for a seamless filtering experience. The collapse column feature allows users to view only the essential data, streamlining their experience.

                </p>
                <p style={{ fontSize: "13px" }}>
                    A user can create or list a new tour package, the “Create Tour Package” option is readily available.

                </p>
            </Modal>

        </div>
    );
}