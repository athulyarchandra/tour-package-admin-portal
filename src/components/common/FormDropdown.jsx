import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';

const FormDropdown = ({
    id,
    label,
    value,
    options,
    onChange,
    required = false
}) => {
    return (
        <FloatLabel variant="on">
            <Dropdown
                id={id}
                value={value}
                options={options}
                optionLabel="name"
                onChange={onChange}
                className="w-full"
                showClear
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

export default FormDropdown;