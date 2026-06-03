import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

const FormInput = ({
    id,
    label,
    value,
    onChange,
    required = false
}) => {
    return (
        <FloatLabel variant="on">
            <InputText
                id={id}
                value={value}
                onChange={onChange}
                className="w-full"
            />

            <label htmlFor={id}>
                {label}
                {required && (
                    <span style={{ color: 'red' }}>
                        *
                    </span>
                )}
            </label>
        </FloatLabel>
    );
};

export default FormInput;