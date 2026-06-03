import { useState } from 'react';

import Card from '../common/SectionCard';
import FormInput from '../common/FormInput';
import FormEditor from '../common/FormEditor';
import { Button } from 'primereact/button';

const TourOperatorDetails = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [address, setAddress] = useState('');

    const [about, setAbout] = useState('');
    const [terms, setTerms] = useState('');

    return (
        <Card title="Tour Operator Details">

            <div className="grid">

                <div className="col">
                    <FormInput
                        label="Tour Operator Name"
                        value={name}
                        required
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
                </div>

                <div className="col">
                    <FormInput
                        label="Phone Number"
                        value={phone}
                        required
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                    />
                </div>

                <div className="col">
                    <FormInput
                        label="Website"
                        value={website}
                        onChange={(e) =>
                            setWebsite(e.target.value)
                        }
                    />
                </div>
                <div className="col-fixed">
                    <Button label="Upload Logo" style={{ backgroundColor: '#FFD500', color: 'black', border: 'none' }} />
                </div>

            </div>

            <div className="mt-3">
                <FormInput
                    label="Address"
                    value={address}
                    required
                    onChange={(e) =>
                        setAddress(e.target.value)
                    }
                />
            </div>

            <div className="mt-4">
                    <FormEditor
                        value={about}
                        onChange={setAbout}
                        placeholder="About the Operator..."
                    />
            </div>

            <div className="mt-4">
                    <FormEditor
                        value={terms}
                        onChange={setTerms}
                        placeholder="Terms and Conditions..."
                    />
            </div>

        </Card>
    );
};

export default TourOperatorDetails;