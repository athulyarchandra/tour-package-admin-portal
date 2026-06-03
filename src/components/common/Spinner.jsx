import { ProgressSpinner } from "primereact/progressspinner";

const Spinner = ({
    size = "50px",
    strokeWidth = "4"
}) => {
    return (
        <div className="flex justify-content-center align-items-center">
            <ProgressSpinner
                style={{
                    width: size,
                    height: size
                }}
                strokeWidth={strokeWidth}
                fill="transparent"
                animationDuration=".8s"
            />
        </div>
    );
};

export default Spinner;