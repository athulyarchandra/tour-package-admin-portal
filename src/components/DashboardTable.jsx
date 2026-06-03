import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { tours } from "../constants/tourConfig";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";

export default function DashboardTable({ tours }) {
    const [selectedTours, setSelectedTours] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [goToPage, setGoToPage] = useState("");


    const paginatorTemplate = {
        layout:
            "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",

        PrevPageLink: (options) => (
            <button
                type="button"
                className={classNames(options.className)}
                onClick={options.onClick}
                disabled={options.disabled}
            >
                <span>Previous</span>
                <Ripple />
            </button>
        ),

        NextPageLink: (options) => (
            <button
                type="button"
                className={classNames(options.className)}
                onClick={options.onClick}
                disabled={options.disabled}
            >
                <span>Next</span>
                <Ripple />
            </button>
        ),

        PageLinks: (options) => {
            if (
                (options.view.startPage === options.page &&
                    options.view.startPage !== 0) ||
                (options.view.endPage === options.page &&
                    options.page + 1 !== options.totalPages)
            ) {
                return <span>...</span>;
            }

            return (
                <button
                    type="button"
                    className={options.className}
                    onClick={options.onClick}
                >
                    {options.page + 1}
                    <Ripple />
                </button>
            );
        },

        RowsPerPageDropdown: (options) => (
            <Dropdown
                value={options.value}
                options={[
                    { label: 10, value: 10 },
                    { label: 20, value: 20 },
                    { label: 50, value: 50 }
                ]}
                onChange={options.onChange}
            />
        ),

        CurrentPageReport: (options) => (
            <div className="flex align-items-center gap-2 ml-3">
                <span>Go to</span>

                <InputText
                    value={goToPage}
                    onChange={(e) =>
                        setGoToPage(e.target.value)
                    }
                    onKeyDown={(e) =>
                        e.key === "Enter" &&
                        handleGoTo(goToPage, options)
                    }
                    style={{
                        width: "40px",
                        textAlign: "center"
                    }}
                />
            </div>
        )
    };

    const rowClassName = (rowData) => {
        if (rowData.rowAlert === "Incomplete Form") return "row-alert-incomplete";
        if (rowData.rowAlert === "Withdrawal Expiring") return "row-alert-withdrawal";
        return "";
    };

    const packageIdTemplate = (rowData) => {
        const alertColors = {
            "Incomplete Form": { bg: "#e53935", text: "#fff" },
            "Withdrawal Expiring": { bg: "#e53935", text: "#fff" },
        };
        const alert = rowData.rowAlert ? alertColors[rowData.rowAlert] : null;

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {alert && (
                    <span style={{
                        background: alert.bg,
                        color: alert.text,
                        fontSize: 10,
                        fontWeight: 600,
                        borderRadius: 3,
                        padding: "2px 6px",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        letterSpacing: 0.2,
                    }}>
                        {rowData.rowAlert}
                    </span>
                )}
                <span>{rowData.packageId}</span>
            </div>
        );
    };

    const statusTemplate = (rowData) => {
        const isActive = rowData.status === "Active";
        return (
            <Tag
                value={rowData.status}
                style={{
                    background: "transparent",
                    color: isActive ? "#2E7D32" : "#C62828",
                    border: "none",
                    fontWeight: 600,
                    fontSize: 12,
                    padding: "3px 10px",
                }}
            />
        );
    };

    const viewTemplate = () => (
        <span style={{ color: "#f59e0b", cursor: "pointer", fontWeight: 600 }}>
            View
        </span>
    );

    const totalPages = Math.ceil(tours.length / rows);
    const currentPage = Math.floor(first / rows) + 1;

    const handleGoTo = (page, options) => {
        const pageNo = parseInt(page);

        if (
            !isNaN(pageNo) &&
            pageNo >= 1 &&
            pageNo <= options.totalPages
        ) {
            setFirst((pageNo - 1) * options.rows);
        }
    };

    const paginatorRight = (
        <div className="flex align-items-center gap-2" style={{ marginLeft: 8 }}>
            <span style={{ fontSize: 13, color: "#555", whiteSpace: "nowrap" }}>Go to</span>
            <InputText
                value={goToPage}
                onChange={(e) => setGoToPage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGoTo()}
                style={{ width: 52, padding: "4px 8px", fontSize: 13, textAlign: "center" }}
            />
            <Button
                icon="pi pi-arrow-right"
                rounded
                text
                style={{ color: "#1565C0", padding: 4 }}
                onClick={handleGoTo}
                tooltip={`Go to page ${goToPage || "?"}`}
                tooltipOptions={{ position: "top" }}
            />
        </div>
    );


    return (
        <>
            <div className="card">
                <DataTable
                    value={tours}
                    first={first}
                    rows={rows}
                    onPage={(e) => {
                        setFirst(e.first);
                        setRows(e.rows);
                    }}
                    paginator
                    paginatorTemplate={paginatorTemplate}
                    paginatorPosition="bottom"
                    showGridlines
                    stripedRows
                    scrollable
                    tableStyle={{ minWidth: "1800px" }}
                    selectionMode="multiple"
                    selection={selectedTours}
                    onSelectionChange={(e) =>
                        setSelectedTours(e.value)
                    }
                    dataKey="packageId"
                    rowClassName={rowClassName}
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "2.5rem" }}

                    />

                    <Column
                        field="packageId"
                        header="Package ID"
                        body={packageIdTemplate}
                        sortable
                    />
                    <Column field="createdDate" header="Created Date" sortable />
                    <Column field="createdBy" header="Created By" sortable />
                    <Column field="tourType" header="Tour Type" sortable />
                    <Column field="travelMode" header="Travel Mode" sortable />
                    <Column field="tourCategory" header="Tour Category" sortable />
                    <Column field="tourName" header="Tour Name" sortable />
                    <Column field="tourLocation" header="Tour Locations" sortable />
                    <Column field="startDate" header="Start Date" sortable />
                    <Column field="endDate" header="End Date" sortable />
                    <Column field="days" header="No. of Days" sortable />
                    <Column field="nights" header="No. of Nights" sortable />
                    <Column
                        field="status"
                        header="Status"
                        body={statusTemplate}
                        sortable
                    />
                    <Column header="View" body={viewTemplate} />
                </DataTable>
            </div>
        </>
    );
}