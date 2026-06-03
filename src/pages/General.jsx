import React, { useState } from 'react';

import Modal from '../components/Modal';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import SectionCard from '../components/common/SectionCard'

import TourDetails from '../components/forms/TourDetails';
import TourImages from '../components/forms/TourImages';
import TourOperatorDetails from '../components/forms/TourOperatorDetails';

import FormEditor from '../components/common/FormEditor';
import ProgressBar from '../components/forms/ProgressBar';
import TourPackageBreadcrumb from '../components/common/TourPackageBreadcrumb';
import { useNavigate } from 'react-router-dom';
import { generalInfoSchema } from '../components/hooks/usegenrealValidations';
import { useToast } from '../components/hooks/useToast';
import { useValidation } from '../components/hooks/useValidation';

const General = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [about, setAbout] = useState('');
    const [highlights, setHighlights] = useState('');
    const [inclusions, setInclusions] = useState('');
    const [exclusions, setExclusions] = useState('');
    const [bookingPolicies, setBookingPolicies] = useState('');
    const [cancellationPolicies, setCancellationPolicies] = useState('');
    const [rules, setrules] = useState("")
    const navigate = useNavigate()

    const { toast, error } = useToast();
    const { validate } = useValidation();
    const handleNext = () => {

        const result = validate(
            generalInfoSchema,
            {
                tourType,
                travelMode,
                tourCategory,
                tourName,
                noOfDays,
                noOfNights
            }
        );

        if (!result.valid) {
            error(result.message);
            return;
        }

        navigate("/tour-package-about");
    };

    return (


        <div className='p-3'>
            {/* Header */}
            <div className="flex justify-content-between align-items-center pb-2">

                <div className="flex align-items-center gap-2">
                    <TourPackageBreadcrumb />
                    <Button
                        icon="pi pi-info-circle"
                        rounded
                        text
                        severity="secondary"
                        onClick={() => setShowOverlay(true)}
                    />
                </div>

                <Button
                    label="Back"
                    onClick={() => navigate(-1)}
                    style={{ color: "black", backgroundColor: "white", border: "1px solid" }}
                    className='px-2 py-1'
                />
            </div>

            {/* Modal */}
            <Modal
                visible={showOverlay}
                onClose={() => setShowOverlay(false)}
                title="Create Tour Packages"
            >
                <p>
                    Here you can create different type of tour packages by consuming various services.The process of creating the tour packages consists of four step progressive form submission  which are
                </p>
                <ol>
                    <li>General information page - where you have to add all the related info including the policies, inclusions, exclusions , other rules etc.which create a greeted content for the intended users prior to their booking decision.</li>
                    <li>Schedule page - here you can create your schedule for a specific period of time aligned within the Introduction date and withdrawal date.</li>
                    <li>Guest Journey - If you're managing the guest's travel from their home location and throughout the itinerary using different vehicles that require seat selection, please include all relevant information in this section; otherwise, simply toggle it off.And under this section you have to schedule your tour package in multiple times throughout the period you are opting.</li>
                    <li>Itinerary - here you can simply create your detailed itinerary by adding multiple managed services.</li>
                    <li>Pricing - you can list your pricing which is more detailed in nature for the tour package.</li>
                </ol>
                <p>
                    After completing the above listed form then submit to complete the tour package. Each such service will be saved in the Tour tables.
                </p>
            </Modal>

            <ProgressBar />

            {/* Rest of page */}


            {/* Section 1 */}
            <TourDetails />

            {/* Section 2 */}
            <div className="mt-4">
                <SectionCard title="Tour Package About">
                    <FormEditor
                        value={about}
                        onChange={setAbout}
                        placeholder="Describe the tour package..."
                    />
                </SectionCard>
            </div>

            {/* Section 3 */}
            <div className="mt-4">
                <SectionCard title="Tour Package Highlights">
                    <FormEditor
                        value={highlights}
                        onChange={setHighlights}
                        placeholder="Enter package Highlights..."
                    />
                </SectionCard>
            </div>

            {/* Section 4 */}
            <div className="mt-4">
                <SectionCard title="Inclusions">
                    <FormEditor
                        value={inclusions}
                        onChange={setInclusions}
                        placeholder="Enter package inclusions..."
                    />
                </SectionCard>
            </div>

            {/* Section 5 */}
            <div className="mt-4">
                <SectionCard title="Exclusions">
                    <FormEditor
                        value={exclusions}
                        onChange={setExclusions}
                        placeholder="Enter package exclusions..."
                    />
                </SectionCard>
            </div>

            {/* Section 6 */}
            <div className="mt-4">
                <SectionCard title="Booking Policies">
                    <FormEditor
                        value={bookingPolicies}
                        onChange={setBookingPolicies}
                        placeholder="Booking Policies..."
                    />
                </SectionCard>
            </div>

            {/* Section 7 */}
            <div className="mt-4">
                <SectionCard title="Cancellation Policies">
                    <FormEditor
                        value={cancellationPolicies}
                        onChange={setCancellationPolicies}
                        placeholder="Enter Cancellation Policies..."
                    />
                </SectionCard>
            </div>

            <div className="mt-4">
                <SectionCard title="Rules & Regulations">
                    <FormEditor
                        value={rules}
                        onChange={setrules}
                        placeholder="Enter regulations..."
                    />
                </SectionCard>
            </div>
            {/* Section 8 */}
            <div className="mt-4">
                <TourImages />
            </div>

            {/* Section 9 */}
            <div className="mt-4">
                <TourOperatorDetails />
            </div>

            {/* Footer */}
            <div className="flex justify-content-end gap-2 mt-5 mb-5">
                <Button
                    label="Cancel"
                    severity="secondary"
                    onClick={() => navigate(-1)}
                    style={{color:"black",backgroundColor:"white"}}
                />

             

                <Button
                    label="Next"
                    onClick={handleNext}
                    style={{color:"black",backgroundColor:"#FFD500"}}
                />
            </div>


        </div>
    );
};

export default General;