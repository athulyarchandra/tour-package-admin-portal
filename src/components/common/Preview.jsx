import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";

export default function Preview({ locations }) {
    const op = useRef(null);

    const visibleLocation = locations[0];
    const remaining = locations.slice(1);

    return (
        <>
            <div>
                <label>Tour Locations</label>

                <p
                    style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0%" }}
                >
                    {visibleLocation}

                    {remaining.length > 0 && (
                        <span
                            style={{color:"#f5b800",cursor:"pointer"}}
                            onClick={(e) => op.current.toggle(e)}
                        >
                            {" "}
                            +{remaining.length} more
                        </span>
                    )}
                </p>
            </div>

            <OverlayPanel
                ref={op}
                className="location-overlay"
            >
                <div className="location-list">
                    {locations.map((location, index) => (
                        <div
                            key={index}
                            className="location-item"
                        >
                            {location}
                        </div>
                    ))}
                </div>
            </OverlayPanel>
        </>
    );
}