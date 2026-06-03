import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';

const MAX_CHARACTERS = 5000;

const FormEditor = ({ title, value, onChange, error, placeholder }) => {
    const textLength = value ? value.replace(/<[^>]*>/g, '').trim().length : 0;
    const remaining = MAX_CHARACTERS - textLength;

    const header = (
        <span className="ql-formats my-2">
            <button className="ql-header" value="1" />
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-strike" />
            <button className="ql-underline" />
            <button className="ql-hr" />
            <button className="ql-list" value="bullet" />
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="check" />
            <button className="ql-indent" value="+1" />
            <button className="ql-indent" value="-1" />
            <button className="ql-table" />
            <button className="ql-image" />
        </span>
    );

    return (
        <div>
            {title && (
                <div className="mb-2">
                    <span style={{ fontWeight: 600, fontSize: '14px', }}>
                        {title}<span style={{ color: 'red' }}> *</span>
                    </span>
                </div>
            )}

            {/* KEY FIX: relative wrapper so button can float over toolbar */}
            <div style={{ position: 'relative' }}>

                {/* Button absolutely on top of toolbar — never touches Quill DOM */}
                <Button
                    label="Generate with AI"
                    icon="pi pi-sparkles"
                    size="small"
                    type="button"
                    style={{
                        position: 'absolute',
                        top: '7px',
                        right: '8px',
                        zIndex: 10,
                        background: "linear-gradient(90deg, #0066FF 0%, #003D99 100%)",
                        border: "none",
                        color: "#FFFFFF",
                        fontWeight: 600
                    }}
                    onClick={() => console.log('Generate AI clicked')}
                />

                <Editor
                    value={value}
                    onTextChange={(e) => onChange(e.htmlValue ?? '')}
                    headerTemplate={header}
                    placeholder={placeholder}
                    style={{
                        height: '200px',
                        border: error ? '1.5px solid red' : undefined,
                    }}
                />
            </div>

            {error && (
                <small style={{ color: 'red', display: 'block', marginTop: 4 }}>
                    {error}
                </small>
            )}

            <small className="text-500" style={{ display: 'block', marginTop: 4 }}>
                Maximum {MAX_CHARACTERS} characters ({remaining} remaining)
            </small>
        </div>
    );
};

export default FormEditor;