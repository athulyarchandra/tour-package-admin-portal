import { Card } from 'primereact/card';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import ImgUpldongForm from '../components/ImgUpldongForm';
import { useState } from 'react';

const FormEditor = ({
    title,
    value,
    onChange
}) => {

    const [sections, setSections] = useState([1]);

    const addSection = () => {
        setSections([...sections, Date.now()]);
    };

    const removeSection = (id) => {
        setSections(
            sections.filter(item => item !== id)
        );
    };

    const header = (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <span>{title}</span>

            <Button
                label="Generate with AI"
                icon="pi pi-sparkles"
                size="small"
            />
        </div>
    );


    return (
        <>
            <Card header={header} className='mt-4 p-3'>
                <div className="mb-3">
                    <label>
                        {title} <span style={{ color: 'red' }}>*</span>
                    </label>
                </div>

                <Editor
                    value={value}
                    onTextChange={(e) =>
                        onChange(e.htmlValue)
                    }
                    style={{ height: '250px' }}
                />
            </Card>
            <Card title="Upload Images" className='mt-4 p-3'>

                {sections.map((id, index) => (
                    <ImgUpldongForm
                        key={id}
                        isFirst={index === 0}
                        onAdd={addSection}
                        onRemove={() => removeSection(id)}
                    />
                ))}

            </Card>
        </>

    );
};

export default FormEditor;