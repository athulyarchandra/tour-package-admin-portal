import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
    return (
        <div className="app-layout">
            <Header />

            <div className="body-layout">
                <aside className="sidebar">
                    <Sidebar />
                </aside>

                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}