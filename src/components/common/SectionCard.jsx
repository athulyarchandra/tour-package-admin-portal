import { Card } from "primereact/card";

const SectionCard = ({ title, children }) => {
    const header = (
        <div style={{
            backgroundColor: "#FFF2B0",
            padding: "14px 18px",
            fontWeight: 600,
            fontSize: "16px",
            color: "#1a1a1a",
            borderBottom: "1px solid #e8e0a0"
        }}>
            {title}
        </div>
    );

    return (
        <Card header={header} style={{ borderRadius: "6px", marginBottom: "20px" }}>
            {children}
        </Card>
    );
};

export default SectionCard;