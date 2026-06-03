import { useState } from 'react';

import Card from '../common/SectionCard';
import FormDropdown from '../common/FormDropdown';
import FormCalendar from '../common/FormCalendar';
import FormRadioGroup from '../common/FormRadioGroup';
import { Tooltip } from 'primereact/tooltip';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import {
    TOUR_TYPES,
    TRAVEL_MODES,
    TOUR_CATEGORIES
} from '../../constants/tourConfig';
import FormNumberInput from '../common/FormNumberInput';

const TourDetails = () => {

    const [tourType, setTourType] = useState(null);
    const [travelMode, setTravelMode] = useState(null);
    const [tourCategory, setTourCategory] = useState(null);
    const [tourPackageName, setTourPackageName] = useState('');
    const [days, setDays] = useState(null);
    const [nights, setNights] = useState(null);
    const [introductionDate, setIntroductionDate] = useState(null);
    const [withdrawalDate, setWithdrawalDate] = useState(null);

    const [advanceReservation, setAdvanceReservation] = useState(null);
    const [maxBooking, setMaxBooking] = useState(null);

    const [oneTimePackage, setOneTimePackage] = useState('No');
    const handleTourTypeChange = (e) => {
        setTourType(e.value);

        // Reset dependent dropdown
        setTravelMode(null);
    };

    const availableTravelModes =
        tourType
            ? TRAVEL_MODES[tourType.name]
            : [];
    const dayOptions = Array.from(
        { length: 50 },
        (_, i) => ({
            name: String(i + 1)
        })
    );
    const nightOptions = Array.from(
        { length: 51 },
        (_, i) => ({
            name: String(i)
        })
    );
    const maxWithdrawalDate = introductionDate
        ? new Date(
            introductionDate.getTime() +
            365 * 24 * 60 * 60 * 1000
        )
        : null;
    const handleIntroductionDate = (e) => {
        setIntroductionDate(e.value);
        if (
            withdrawalDate &&
            withdrawalDate < e.value
        ) {
            setWithdrawalDate(null);
        }
    };
    const handleWithdrawalDate = (e) => {
        const selectedDate = e.value;

        if (!introductionDate) {
            return;
        }

        const diffDays = Math.ceil(
            (selectedDate - introductionDate) /
            (1000 * 60 * 60 * 24)
        );

        if (diffDays > 365) {
            alert(
                "You are not able to select a time interval between introduction date and withdrawal date beyond 365 days. Please select appropriate time interval within limit."
            );

            return;
        }

        setWithdrawalDate(selectedDate);
    };

    return (
        <Card title="Tour Details">

            {/* Row 1 */}
            <div className="grid">

                <div className="col">
                    <FormDropdown
                        label="Tour Type"
                        required
                        value={tourType}
                        options={TOUR_TYPES}
                        placeholder="Select Tour Type"
                        onChange={handleTourTypeChange}
                    />
                </div>

                <div className="col">
                    <FormDropdown
                        label="Travel Mode"
                        required
                        value={travelMode}
                        options={availableTravelModes}
                        placeholder="Select Travel Mode"
                        onChange={(e) =>
                            setTravelMode(e.value)
                        }
                    />
                </div>

                <div className="col">
                    <FormDropdown
                        label="Tour Category"
                        required
                        value={tourCategory}
                        options={TOUR_CATEGORIES}
                        placeholder="Select Tour Category"
                        onChange={(e) =>
                            setTourCategory(e.value)
                        }
                    />
                </div>

                <div className="col">
                    <FloatLabel>
                        <InputText
                            id="tourPackageName"
                            value={tourPackageName}
                            onChange={(e) =>
                                setTourPackageName(
                                    e.target.value
                                )
                            }
                            className="w-full"
                        />

                        <label htmlFor="tourPackageName">
                            Tour Package Name *
                        </label>
                    </FloatLabel>
                </div>

            </div>

            {/* Row 2 */}

            <div className="grid mt-3">

                <div className="col">
                    <FormDropdown
                        label="No Of Days"
                        value={days}
                        options={dayOptions}
                        onChange={(e) => setDays(e.value)}
                    />
                </div>

                <div className="col">
                    <FormDropdown
                        label="No Of Nights"
                        value={nights}
                        options={nightOptions}
                        onChange={(e) => setNights(e.value)}
                    />
                </div>

                <div className="col">
                    <FormCalendar
                        value={introductionDate}
                        onChange={(e) => setIntroductionDate(e.value)}
                        placeholder="Introduction Date"
                    />
                </div>

                <div className="col">
                    <FormCalendar
                        value={withdrawalDate}
                        onChange={handleWithdrawalDate}
                        placeholder="Withdrawal Date"
                        minDate={introductionDate}
                        maxDate={maxWithdrawalDate}
                    />
                </div>

                <div className="col">

                    <FormNumberInput
                        id="advanceReservation"
                        value={advanceReservation}
                        onChange={setAdvanceReservation}
                        label="Advance Reservation Days *"
                        min={1}
                        max={365}
                    />
                </div>

            </div>

            {/* Row 3 */}

            <div className="grid mt-3">

                <div className="col-3">

                    <FormNumberInput
                        id="maxBooking"
                        value={maxBooking}
                        onChange={setMaxBooking}
                        label="Max Booking Permitted *"
                        min={1}
                        max={5000}
                    />


                </div>

                <div className="col">

                    <FormRadioGroup
                        label="Is this one time package?"
                        value={oneTimePackage}
                        onChange={setOneTimePackage}

                    />

                </div>

            </div>

        </Card>
    );
};

export default TourDetails;