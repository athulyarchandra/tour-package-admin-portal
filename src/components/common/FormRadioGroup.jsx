import { RadioButton } from 'primereact/radiobutton';

const FormRadioGroup = ({
    label,
    value,
    onChange
}) => {
    return (
        <div>
            <span>{label}</span>

            <div className="flex gap-3 mt-2">
                <div>
                    <RadioButton
                        inputId="yes"
                        value="Yes"
                        checked={value === 'Yes'}
                        onChange={(e) =>
                            onChange(e.value)
                        }
                    />
                    <label htmlFor="yes"> Yes</label>
                </div>

                <div>
                    <RadioButton
                        inputId="no"
                        value="No"
                        checked={value === 'No'}
                        onChange={(e) =>
                            onChange(e.value)
                        }
                    />
                    <label htmlFor="no"> No</label>
                </div>
            </div>
        </div>
    );
};

export default FormRadioGroup;