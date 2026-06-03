import { useState } from 'react';
import { z } from 'zod';
import { Button } from 'primereact/button';
import SectionCard from '../common/SectionCard';
import FormEditor from '../common/FormEditor';

const schema = z.object({
    about: z.string()
        .min(1, 'Tour Package About is required')
        .max(5000, 'Maximum 5000 characters allowed'),
    inclusion: z.string()
        .min(1, 'Tour Inclusion is required')
        .max(5000, 'Maximum 5000 characters allowed'),
});

const stripHtml = (html) => html?.replace(/<[^>]*>/g, '').trim() ?? '';

const TourPackageAbout = () => {
    const [about, setAbout] = useState('');
    const [inclusion, setInclusion] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        const result = schema.safeParse({
            about: stripHtml(about),
            inclusion: stripHtml(inclusion),
        });

        if (!result.success) {
            const fieldErrors = {};
            result.error.errors.forEach((e) => {
                fieldErrors[e.path[0]] = e.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        console.log('Valid:', { about, inclusion });
    };

    return (
        <SectionCard title="Tour Package About">
            <FormEditor
                title="Tour Package About"
                value={about}
                onChange={(val) => { setAbout(val); setErrors((e) => ({ ...e, about: undefined })); }}
                error={errors.about}
            />

            <div className="mt-5">
                <FormEditor
                    title="Tour Inclusion"
                    value={inclusion}
                    onChange={(val) => { setInclusion(val); setErrors((e) => ({ ...e, inclusion: undefined })); }}
                    error={errors.inclusion}
                />
            </div>

            <div className="mt-4 flex justify-content-end">
                <Button label="Save" onClick={handleSubmit} />
            </div>
        </SectionCard>
    );
};

export default TourPackageAbout;