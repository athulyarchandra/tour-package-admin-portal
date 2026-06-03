import React, { useEffect, useState } from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch } from 'primereact/inputswitch';
import DashboardTable from "./DashboardTable";
import { Card } from "primereact/card";
import TourToolbar from "./TourToolbar";
import FormDropdown from "./common/FormDropdown";
import { Calendar } from "primereact/calendar";
import { TOUR_CATEGORIES, TOUR_NAMES, TOUR_TYPES, tours } from "../constants/tourConfig";
import Preview from "./common/Preview";
import { useFilter } from "./contexts/FilterContext";

const DashboardContent = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [tourLocations, setTourLocations] = useState([
        "Munnar",
        "Kollam",
        "Kozhikode",
        "Trivandrum"
    ]);
    const {
        tourType,
        setTourType,
        tourCategory,
        setTourCategory,
        tourNames,
        setTourNames,
        withdrawalDate,
        setWithdrawalDate
    } = useFilter();
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const filteredTours = tours.filter((tour) => {
        const matchTourType =
            !tourType ||
            tour.tourType === tourType.name;

        const matchTourCategory =
            !tourCategory ||
            tour.tourCategory === tourCategory.name;

        const matchTourName =
            !tourNames ||
            tour.tourName === tourNames.name;

        const matchDate =
            !withdrawalDate ||
            tour.startDate === formatDate(withdrawalDate);

        return (
            matchTourType &&
            matchTourCategory &&
            matchTourName &&
            matchDate
        );
    });
    const handleTourTypeChange = (e) => {
        setTourType(e.value);
        setTravelMode(null);
    };


    return (
        <div className="p-3">
            <TourToolbar />
            <hr />
            {/* Your table/content below */}
            <div className="grid mt-3">

                <div className="col">
                    <FormDropdown
                        label="Tour Type"
                        required
                        value={tourType}
                        options={TOUR_TYPES}
                        placeholder="Select Tour Type"
                        onChange={handleTourTypeChange}
                    />

                </div>
                <div className="col">
                    <FormDropdown
                        label="Tour Category"
                        required
                        value={tourCategory}
                        options={TOUR_CATEGORIES}
                        placeholder="Select Tour Type"
                        onChange={(e) => setTourCategory(e.value)}
                    />
                </div>
                <div className="col">
                    <FormDropdown
                        label="Tour Names"
                        required
                        value={tourNames}
                        options={TOUR_NAMES}
                        placeholder="Select Tour Type"
                        onChange={(e) => setTourNames(e.value)}
                    />
                </div>
                <div className="col">
                    <Calendar
                        value={withdrawalDate}
                        onChange={(e) => setWithdrawalDate(e.value)}
                        placeholder="Start Date"
                        showIcon
                        className="w-full"
                    />
                </div>
            </div>
            <DashboardTable tours={filteredTours} />
            <Card className="tour-card mt-3">

                <div className="tour-grid">

                    <div>
                        <label>Package ID</label>
                        <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0%" }}>PK01</p>
                    </div>

                    <div>
                        <label>Created Date</label>
                        <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0%" }}>13/10/2024, 10:00 AM</p>
                    </div>

                    <div>
                        <label>Created By</label>
                        <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0%" }}>Karalo Marila</p>
                    </div>

                    <div>
                        <label>Tour Type</label>
                        <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0%" }}>Domestic Tours</p>
                    </div>

                    <div>
                        <label>Travel Mode</label>
                        <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0%" }}>Bus Tour</p>
                    </div>

                    <div>
                        <label>Tour Category</label>
                        <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0%" }}>Mountain Tour Package</p>
                    </div>

                    <div>
                        <label>Tour Name</label>
                        <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0%" }}>Surf Through Thrilling Waves</p>
                    </div>

                    <div>
                        <Preview className="more-link" locations={tourLocations} />
                    </div>

                    <div>
                        <label>Start Date</label>
                        <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0%" }}>12/03/2023, 10:00 AM</p>
                    </div>

                    <div>
                        <label>End Date</label>
                        <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0%" }}>15/03/2023, 10:00 AM</p>
                    </div>

                    <div>
                        <label>No. of Days</label>
                        <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0%" }}>5</p>
                    </div>

                    <div>
                        <label>No. of Nights</label>
                        <p style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0%" }}>4</p>
                    </div>

                </div>

                <div className="tour-footer">

                    <div className="left-actions">

                        <Button
                            label="Delete"
                            severity="danger"
                            className="px-3 py-1"
                            style={{ color: "white", backgroundColor: "#EB0909" }}

                        />

                        <div className="status-toggle h-9 items-center">
                            <span>Active</span>
                            <span className="inactive">
                                Inactive
                            </span>
                        </div>

                    </div>

                    <div className="right-actions">

                        <Button
                            label="Duplicate"
                            outlined
                            className="px-3 py-1"
                            style={{ color: "black", backgroundColor: "", border: "1px solid" }}
                        />

                        <Button
                            label="Edit"
                            className="px-3 py-1"
                            style={{ color: "black", backgroundColor: "#FFD700" }}
                        />

                    </div>

                </div>

            </Card>

        </div>
    );
};

export default DashboardContent;