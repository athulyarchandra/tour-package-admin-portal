import { useState, useRef, useCallback, useEffect } from 'react';
import Card from '../common/SectionCard';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Message } from 'primereact/message';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';


const FILE_TYPE_CONFIG = {
    'Image Files': {
        accept: '.jpg,.jpeg',
        mimeTypes: ['image/jpeg'],
        maxSizeBytes: 1.5 * 1024 * 1024,    
        maxFiles: 4,
        labelSuffix: null,
        tip: 'Use high-quality landscape images to attract more views.',
        compressionMethod: 'browser-image-compression (quality: 1.0)',
        isVideo: false,
        is360: false,
    },
    '360-Degree Image': {
        accept: '.jpg,.jpeg',
        mimeTypes: ['image/jpeg'],
        maxSizeBytes: 8 * 1024 * 1024,          
        maxFiles: 1,
        labelSuffix: '_360-DegreeImages',
        tip: 'Make sure the image is in 360-degree equirectangular format for proper viewing.',
        compressionMethod: 'browser-image-compression (quality: 1.0) + react-photo-sphere-viewer',
        isVideo: false,
        is360: true,
    },
    'Video Files': {
        accept: '.mp4,.mov,.webm',
        mimeTypes: ['video/mp4', 'video/quicktime', 'video/webm'],
        maxSizeBytes: 100 * 1024 * 1024,        
        maxFiles: 1,
        labelSuffix: '_VideoFiles',
        tip: 'Showcase your service in action! Ensure clear visuals and good lighting.',
        compressionMethod: 'ffmpeg.wasm — in-browser transcode (CRF 21-23)',
        isVideo: true,
        is360: false,
    },
    '360-Degree Video File': {
        accept: '.mp4,.mov,.webm',
        mimeTypes: ['video/mp4', 'video/quicktime', 'video/webm'],
        maxSizeBytes: 150 * 1024 * 1024,       
        maxFiles: 1,
        labelSuffix: '_360-DegreeVideoFile',
        tip: 'Showcase your service in action! Ensure clear visuals and good lighting.',
        compressionMethod: 'ffmpeg.wasm — in-browser transcode (CRF 21-23)',
        isVideo: true,
        is360: true,
    },
};

const FILE_TYPE_OPTIONS = Object.keys(FILE_TYPE_CONFIG).map((name) => ({ name }));


const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(3)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const getAutoLibraryName = (baseName, fileTypeName) => {
    const config = FILE_TYPE_CONFIG[fileTypeName];
    if (!config?.labelSuffix || !baseName.trim()) return baseName;
    const stripped = baseName
        .replace(/_360-DegreeImages$/, '')
        .replace(/_VideoFiles$/, '')
        .replace(/_360-DegreeVideoFile$/, '')
        .trimEnd();
    return stripped + config.labelSuffix;
};

const createSection = (defaultFileType = null) => ({
    id: Date.now() + Math.random(),
    fileType: defaultFileType,
    libraryName: '',
    baseLibraryName: '',
    files: [],
    errors: [],
    dragOver: false,
});


const FileThumbnail = ({ file, onRemove }) => {
    const isVideo = file.type.startsWith('video/');
    const url = URL.createObjectURL(file);

    return (
        <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
            {isVideo ? (
                <video
                    src={url}
                    style={{
                        width: 64, height: 64,
                        objectFit: 'cover',
                        borderRadius: 6,
                        border: '1px solid #dee2e6',
                    }}
                    muted
                />
            ) : (
                <img
                    src={url}
                    alt={file.name}
                    style={{
                        width: 64, height: 64,
                        objectFit: 'cover',
                        borderRadius: 6,
                        border: '1px solid #dee2e6',
                    }}
                    onLoad={() => URL.revokeObjectURL(url)}
                />
            )}
            <button
                onClick={onRemove}
                style={{
                    position: 'absolute', top: -7, right: -7,
                    width: 20, height: 20, borderRadius: '50%',
                    background: '#e53935', color: 'white',
                    border: '2px solid white',
                    fontSize: 10, fontWeight: 700,
                    cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    lineHeight: 1, padding: 0,
                }}
                title="Remove file"
            >
                ✕
            </button>
            {isVideo && (
                <div style={{
                    position: 'absolute', bottom: 4, left: 4,
                    background: 'rgba(0,0,0,0.6)', borderRadius: 3,
                    padding: '1px 4px', fontSize: 9, color: 'white',
                }}>▶ VIDEO</div>
            )}
        </div>
    );
};


const SectionBlock = ({
    section,
    index,
    onAdd,
    onRemove,
    onUpdateFileType,
    onUpdateLibraryName,
    onFilesAdded,
    onFileRemoved,
}) => {
    const inputRef = useRef(null);
    const config = section.fileType ? FILE_TYPE_CONFIG[section.fileType.name] : null;

    const maxBytes = config?.maxSizeBytes ?? 100 * 1024 * 1024;
    const usedBytes = section.files.reduce((a, f) => a + f.size, 0);
    const usedPct = Math.min((usedBytes / maxBytes) * 100, 100);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        onFilesAdded(section.id, Array.from(e.dataTransfer.files));
    }, [section.id, onFilesAdded]);

    const handleDragOver = (e) => e.preventDefault();

    const progressColor = usedPct > 85 ? '#e53935' : usedPct > 60 ? '#FF9800' : '#FFC107';

    return (
        <div
            className="mb-3 p-3 border-round border-1 surface-border"
            style={{ background: '#fff' }}
        >
            <div className="grid align-items-end justify-center">
                <div className="col-3">
                    <label className="block mb-1" style={{ fontSize: 13 }}>
                        File Type <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Dropdown
                        value={section.fileType}
                        options={FILE_TYPE_OPTIONS}
                        optionLabel="name"
                        placeholder="Select File Type"
                        showClear
                        className="w-full"
                        onChange={(e) => onUpdateFileType(section.id, e.value)}
                    />
                </div>

                <div className="col">
                    <label className="block mb-1" style={{ fontSize: 13 }}>
                        Name of Image Library <span style={{ color: 'red' }}>*</span>
                    </label>
                    <InputText
                        value={section.libraryName}
                        placeholder={config?.labelSuffix ? `e.g. Bus Exterior${config.labelSuffix}` : 'Enter library name'}
                        className="w-full"
                        onChange={(e) => onUpdateLibraryName(section.id, e.target.value)}
                    />
                </div>

                <div className="col-fixed flex align-items-center pb-2" style={{ paddingBottom: 0 }}>
                    {index === 0 ? (
                        <Button
                            icon="pi pi-plus"
                            rounded
                            onClick={onAdd}
                            style={{color:"black",backgroundColor:"#FFD500" ,}}
                            tooltip="Add another library section"
                            tooltipOptions={{ position: 'top' }}
                        />
                    ) : (
                        <Button
                            icon="pi pi-minus"
                            rounded
                            style={{color:"black",backgroundColor:"#FFD500"}}
                            onClick={() => onRemove(section.id)}
                            tooltip="Remove this section"
                            tooltipOptions={{ position: 'top' }}
                        />
                    )}
                </div>
            </div>

            {config?.tip && (
                <div className="mt-2" style={{
                    background: '#FFFDE7',
                    border: '1px solid #FFF176',
                    borderRadius: 4,
                    padding: '6px 10px',
                    fontSize: 12,
                    color: '#795548',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 6,
                }}>
                    <i className="pi pi-info-circle" style={{ marginTop: 1, color: '#F9A825' }} />
                    <span>{config.tip}</span>
                </div>
            )}

            {config && (
                <div className="mt-2 flex align-items-center gap-2" style={{ fontSize: 11 }}>
                    <Tag
                        value={`Compression: ${config.compressionMethod}`}
                        severity="secondary"
                        style={{ fontSize: 11, background: '#f5f5f5', color: '#666', border: '1px solid #e0e0e0' }}
                    />
                </div>
            )}

            <div
                className="mt-3"
                style={{
                    border: `2px dashed ${section.dragOver ? '#FFC107' : '#dee2e6'}`,
                    borderRadius: 6,
                    padding: '10px 14px',
                    background: section.dragOver ? '#FFFDE7' : '#fafafa',
                    transition: 'all 0.2s',
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={() => {}}
                onDragLeave={() => {}}
            >
                <div className="flex justify-content-between align-items-center flex-wrap gap-2">
                    <Button
                        icon="pi pi-paperclip"
                        label="Upload Media Files"
                        outlined
                        size="small"
                        style={{ borderColor: '#ced4da', color: '#333' }}
                        disabled={!section.fileType}
                        onClick={() => inputRef.current?.click()}
                    />
                    <input
                        ref={inputRef}
                        type="file"
                        multiple={config?.maxFiles > 1}
                        accept={config?.accept ?? '*'}
                        style={{ display: 'none' }}
                        onChange={(e) => onFilesAdded(section.id, Array.from(e.target.files))}
                    />

                    {section.files.length > 0 && (
                        <div className="flex align-items-center gap-2" style={{ fontSize: 12, color: '#666' }}>
                            <span>{formatBytes(usedBytes)} / {formatBytes(maxBytes)}</span>
                            <div style={{ width: 80, height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{
                                    width: `${usedPct}%`,
                                    height: '100%',
                                    background: progressColor,
                                    borderRadius: 4,
                                    transition: 'width 0.3s ease',
                                }} />
                            </div>
                            <span style={{ color: '#aaa' }}>
                                {section.files.length}/{config?.maxFiles ?? '∞'} file{config?.maxFiles !== 1 ? 's' : ''}
                            </span>
                        </div>
                    )}

                    {!section.fileType && (
                        <span style={{ fontSize: 12, color: '#aaa' }}>Select a file type first</span>
                    )}

                    {section.fileType && section.files.length === 0 && (
                        <span style={{ fontSize: 12, color: '#aaa' }}>
                            Drag & drop or click to upload · {config?.accept?.toUpperCase().replace(/\./g, '').replace(/,/g, ', ')}
                        </span>
                    )}
                </div>

                {section.files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {section.files.map((file, i) => (
                            <FileThumbnail
                                key={`${file.name}-${i}`}
                                file={file}
                                onRemove={() => onFileRemoved(section.id, i)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {section.errors.length > 0 && (
                <div className="mt-2 flex flex-column gap-1">
                    {section.errors.map((err, i) => (
                        <Message key={i} severity="error" text={err} style={{ fontSize: 12 }} />
                    ))}
                </div>
            )}
        </div>
    );
};

const TourImages = () => {
    const [sections, setSections] = useState([createSection()]);
    const toast = useRef(null);


    const getFirstFileType = (sectionList) =>
        sectionList.find((s) => s.fileType)?.fileType ?? null;

    const validateFiles = (files, config, existingCount) => {
        const errors = [];
        const valid = [];

        for (const file of files) {
            if (!config.mimeTypes.includes(file.type)) {
                errors.push(
                    `"${file.name}" — Invalid file type. Accepted: ${config.accept.toUpperCase().replace(/\./g, '').replace(/,/g, ', ')}.`
                );
                continue;
            }
            if (file.size > config.maxSizeBytes) {
                errors.push(
                    `"${file.name}" exceeds maximum size of ${formatBytes(config.maxSizeBytes)}.`
                );
                continue;
            }
            valid.push(file);
        }

        const remaining = config.maxFiles - existingCount;
        if (valid.length > remaining) {
            errors.push(`Only ${remaining} more file(s) allowed for this library (max ${config.maxFiles}).`);
            valid.splice(remaining);
        }

        return { valid, errors };
    };


    const handleAddSection = () => {
        const defaultType = getFirstFileType(sections);
        setSections((prev) => [...prev, createSection(defaultType)]);
    };

    const handleRemoveSection = (id) => {
        setSections((prev) => prev.filter((s) => s.id !== id));
    };

    const handleUpdateFileType = (id, newType) => {
        setSections((prev) =>
            prev.map((s) => {
                if (s.id !== id) return s;
                const config = newType ? FILE_TYPE_CONFIG[newType.name] : null;
                const libraryName = config?.labelSuffix && s.baseLibraryName
                    ? s.baseLibraryName + config.labelSuffix
                    : s.baseLibraryName;
                return { ...s, fileType: newType, libraryName, files: [], errors: [] };
            })
        );
    };

    const handleUpdateLibraryName = (id, value) => {
        setSections((prev) =>
            prev.map((s) => {
                if (s.id !== id) return s;
                const config = s.fileType ? FILE_TYPE_CONFIG[s.fileType.name] : null;
                let base = value;
                if (config?.labelSuffix) {
                    base = value.replace(new RegExp(`${config.labelSuffix}$`), '').trimEnd();
                }
                const libraryName = config?.labelSuffix && base
                    ? base + config.labelSuffix
                    : value;
                return { ...s, baseLibraryName: base, libraryName };
            })
        );
    };

    const handleFilesAdded = (id, files) => {
        setSections((prev) =>
            prev.map((s) => {
                if (s.id !== id) return s;
                if (!s.fileType) return s;

                const config = FILE_TYPE_CONFIG[s.fileType.name];
                const { valid, errors } = validateFiles(files, config, s.files.length);

                if (errors.length > 0 && toast.current) {
                    errors.forEach((err) =>
                        toast.current.show({ severity: 'warn', summary: 'Upload Warning', detail: err, life: 5000 })
                    );
                }

                return {
                    ...s,
                    files: [...s.files, ...valid],
                    errors: errors.length > 0 ? errors : [],
                };
            })
        );
    };

    const handleFileRemoved = (id, fileIndex) => {
        setSections((prev) =>
            prev.map((s) =>
                s.id === id
                    ? { ...s, files: s.files.filter((_, i) => i !== fileIndex), errors: [] }
                    : s
            )
        );
    };

    return (
        <>
            <Toast ref={toast} position="top-right" />

            <Card title="Upload Images">
                {sections.map((section, index) => (
                    <SectionBlock
                        key={section.id}
                        section={section}
                        index={index}
                        onAdd={handleAddSection}
                        onRemove={handleRemoveSection}
                        onUpdateFileType={handleUpdateFileType}
                        onUpdateLibraryName={handleUpdateLibraryName}
                        onFilesAdded={handleFilesAdded}
                        onFileRemoved={handleFileRemoved}
                    />
                ))}
            </Card>
        </>
    );
};

export default TourImages;