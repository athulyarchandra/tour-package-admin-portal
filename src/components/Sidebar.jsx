import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../constants/sidebar";



export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div
            style={{
                width: "250px",
                height: "100vh",
                background: "#fff",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                borderRight: "1px solid #e5e5e5",
                paddingTop:"6px"
            }}
        >
            <style>
                {`
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>

            {menuItems.map((item) => {
                const active =
                    location.pathname === item.path;

                return (
                    <div
                        key={item.path}
                        onClick={() =>
                            navigate(item.path)
                        }
                        style={{
                            padding: "14px 20px",
                            cursor: "pointer",
                            gap: "4px",

                            background: active
                                ? "#FFD600"
                                : "#FFFFFF",
                            fontWeight: active
                                ? 600
                                : 400,
                            transition:
                                "all 0.2s ease"
                        }}
                    >
                        {item.label}
                    </div>
                );
            })}
        </div>
    );
}