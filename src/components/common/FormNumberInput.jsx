import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";

const FormNumberInput = ({
    id,
    value,
    onChange,
    label,
    min = 1,
    max = 9999
}) => {
    return (
        <FloatLabel>
            <InputNumber
                id={id}
                value={value}
                onValueChange={(e) => onChange(e.value)}
                min={min}
                max={max}
                showButtons
                buttonLayout="stacked"
                incrementButtonIcon="pi pi-chevron-up"
                decrementButtonIcon="pi pi-chevron-down"
                className="w-full"
                inputClassName="w-full"
            />

            <label htmlFor={id}>{label}</label>
        </FloatLabel>
    );
};

export default FormNumberInput;