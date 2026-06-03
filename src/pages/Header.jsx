import React, { useState, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Badge } from "primereact/badge";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";

import bookingLogo from "../assets/logo.jpg";
import ksrtcLogo from "../assets/KSRTC-LOGO.png";
import profile from "../assets/profilepic.png";
import "./Header.css";

export default function Header() {
    const [depot, setDepot] = useState(null);
    const [station, setStation] = useState(null);
    const [lang, setLang] = useState({ name: "ENG" });

    const notifRef = useRef(null);
    const menuRef = useRef(null);

    const depots = [{ name: "KSRTC BTC" }, { name: "KSRTC MYS" }];
    const stations = [{ name: "Operating Station One" }, { name: "Operating Station Two" }];
    const languages = [{ name: "ENG" }, { name: "HIN" }, { name: "MAL" }];

    return (
     <header className="header-container">

    {/* Section 1 */}
    <div className="header-left">
        <img src={bookingLogo} alt="Booking Engine" className="booking-logo" />
        <p className="booking-text">
            Booking
            <br />
            Engine.com
        </p>
    </div>

    {/* Section 2 */}
    <div className="yellow-section left-yellow">
        <div className="ksrtc-section">
            <img src={ksrtcLogo} alt="KSRTC" className="ksrtc-logo" />

            <div className="header-dropdowns">
                <Dropdown
                    value={depot}
                    options={depots}
                    optionLabel="name"
                    placeholder="KSRTC BTC"
                    className="header-dropdown"
                    onChange={(e) => setDepot(e.value)}
                />

                <Dropdown
                    value={station}
                    options={stations}
                    optionLabel="name"
                    placeholder="Operating Station One"
                    className="header-dropdown station-dd"
                    onChange={(e) => setStation(e.value)}
                />
            </div>
        </div>
    </div>

    {/* Section 3 */}
    <div className="header-search">
        <IconField iconPosition="left" className="search-field">
            <InputIcon className="pi pi-search search-icon-color" />
            <InputText placeholder="Search" className="search-input" />
        </IconField>
    </div>

    {/* Section 4 */}
    <div className="yellow-section right-yellow">
        <div className="header-right">

            <div
                className="notification"
                onClick={(e) => notifRef.current.toggle(e)}
            >
                <i className="pi pi-bell notif-bell" />
                <Badge value="2" severity="danger" className="notif-badge" />
            </div>

            <Dropdown
                value={lang}
                options={languages}
                optionLabel="name"
                onChange={(e) => setLang(e.value)}
                className="language-dropdown"
            />

            <div className="user-info">
                <span className="welcome-text">Welcome</span>
                <span className="user-name">John Albert</span>
                <span className="date-text">12 Jan, 2023</span>
            </div>

            <img
                src={profile}
                alt="profile"
                className="profile-pic"
                onClick={(e) => menuRef.current.toggle(e)}
            />
        </div>
    </div>

</header>
    );
}