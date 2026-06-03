import { Calendar } from "primereact/calendar";

const FormCalendar = ({
    value,
    onChange,
    placeholder,
    minDate,
    maxDate
}) => {
    return (
        <Calendar
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            showIcon
            dateFormat="dd/mm/yy"
            minDate={minDate}
            maxDate={maxDate}
            className="w-full"
            inputClassName="text-sm"
        />
    );
};

export default FormCalendar;