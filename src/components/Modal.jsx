import React from "react";

const Modal = ({
    visible,
    onClose,
    title,
    children,
    width = "450px"
}) => {
    if (!visible) return null;

    return (
        <>
            <div className="overlay-backdrop" onClick={onClose}></div>

            <div
                className="custom-overlay"
                style={{ width }}
            >
                <div className="overlay-header">
                    <h2>{title}</h2>

                    <button
                        className="overlay-close-btn"
                        onClick={onClose}
                    >
                        <i className="pi pi-times"></i>
                    </button>
                </div>

                <div className="overlay-body">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;