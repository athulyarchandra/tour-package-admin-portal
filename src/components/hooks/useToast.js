import { useRef } from "react";

export const useToast = () => {
    const toast = useRef(null);

    const show = (
        severity,
        summary,
        detail,
        life = 3000
    ) => {
        toast.current?.show({
            severity,
            summary,
            detail,
            life
        });
    };

    const success = (detail) =>
        show("success", "Success", detail);

    const error = (detail) =>
        show("error", "Error", detail);

    const warn = (detail) =>
        show("warn", "Warning", detail);

    const info = (detail) =>
        show("info", "Info", detail);

    return {
        toast,
        show,
        success,
        error,
        warn,
        info
    };
};