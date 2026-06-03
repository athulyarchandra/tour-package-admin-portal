import { useState, useRef } from 'react';
import { Tooltip } from 'primereact/tooltip';

const STEPS = [
    {
        key: 'general',
        label: 'General',
        tooltip: 'This is where you can include key details about the service',
    },
    {
        key: 'schedule',
        label: 'Schedule',
        tooltip: 'Schedule services within the selected introduction and withdrawal dates',
    },
    {
        key: 'guestJourney',
        label: 'Guest Journey',
        tooltip: 'Create guest travel arrangements for this tour package',
    },
    {
        key: 'itinerary',
        label: 'Itinerary',
        tooltip: 'Create tour package itinerary',
    },
    {
        key: 'pricing',
        label: 'Pricing',
        tooltip: 'The cost of service',
    },
];

const ProgressBar = ({
    currentStep = 0,
    completedSteps = new Set(),
    onStepClick,
    errorStep = null,
}) => {
    const fillPct =
        STEPS.length > 1
            ? ((currentStep / (STEPS.length - 1)) * 100).toFixed(2)
            : 0;

    return (
        <div
            style={{
                padding: '0 24px',
                position: 'relative',
            }}
        >            <style>{`
                .step-tooltip.p-tooltip .p-tooltip-text {
                    background: #1c1c1e;
                    color: #f5f5f7;
                    font-size: 12px;
                    border-radius: 8px;
                    padding: 8px 12px;
                    max-width: 220px;
                    text-align: center;
                    line-height: 1.5;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.22);
                }
                .step-tooltip.p-tooltip .p-tooltip-arrow {
                    border-top-color: #1c1c1e !important;
                }
                @keyframes stepShake {
                    0%,100% { transform: rotate(45deg); }
                    20%     { transform: rotate(45deg) translateX(-4px); }
                    40%     { transform: rotate(45deg) translateX(4px); }
                    60%     { transform: rotate(45deg) translateX(-3px); }
                    80%     { transform: rotate(45deg) translateX(2px); }
                }
                .step-diamond-error {
                    animation: stepShake 0.35s ease forwards;
                }
            `}</style>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    position: 'relative',
                    paddingTop: 28,
                    paddingBottom: 20,
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 48,
                        left: '5%',
                        right: '5%',
                        height: 3,
                        background: '#d6ccaa',
                        borderRadius: 2,
                        zIndex: 0,
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            width: `${fillPct}%`,
                            background: '#FFD600',
                            borderRadius: 2,
                            transition: 'width 0.4s cubic-bezier(.4,0,.2,1)',
                        }}
                    />

                    {errorStep !== null && errorStep < STEPS.length - 1 && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: `${(errorStep / (STEPS.length - 1)) * 100}%`,
                                width: `${(1 / (STEPS.length - 1)) * 100}%`,
                                height: '100%',
                                background: '#dc3545',
                                borderRadius: 2,
                            }}
                        />
                    )}
                </div>

                {STEPS.map((step, index) => {
                    const isCompleted = completedSteps.has(step.key);
                    const isActive = index === currentStep;
                    const isError = index === errorStep;

                    let state = 'idle';
                    if (isError) state = 'error';
                    else if (isCompleted) state = 'done';
                    else if (isActive) state = 'active';

                    const diamondStyle = {
                        idle: {
                            background: '#ffffff',
                            border: '2.5px solid #c0b8a0',
                            boxShadow: 'none',
                        },
                        active: {
                            background: '#FFD600',
                            border: '2.5px solid #FFD600',
                            boxShadow: '0 0 0 5px rgba(255,214,0,0.25)',
                        },
                        done: {
                            background: '#FFD600',
                            border: '2.5px solid #FFD600',
                            boxShadow: 'none',
                        },
                        error: {
                            background: '#fff0f0',
                            border: '2.5px solid #dc3545',
                            boxShadow: '0 0 0 5px rgba(220,53,69,0.15)',
                        },
                    }[state];

                    const innerColor = {
                        idle: '#999',
                        active: '#5a4200',
                        done: '#5a4200',
                        error: '#dc3545',
                    }[state];

                    const labelColor = {
                        idle: '#888',
                        active: '#1a1a1a',
                        done: '#666',
                        error: '#dc3545',
                    }[state];

                    const tooltipTarget = `step-node-${index}`;

                    return (
                        <div
                            key={step.key}
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'relative',
                                zIndex: 1,
                                cursor: 'pointer',
                            }}
                            onClick={() => onStepClick?.(index)}
                        >
                            {/* Tooltip anchor */}
                            <div
                                id={tooltipTarget}
                                data-pr-tooltip={step.tooltip}
                                data-pr-position="top"
                                data-pr-classname="step-tooltip"
                                data-pr-mousetrack
                                data-pr-mousetracktop={12}
                                style={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}
                            >
                                <div
                                    className={isError ? 'step-diamond-error' : ''}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        transform: 'rotate(45deg)',
                                        borderRadius: 5,
                                        position: 'absolute',
                                        transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
                                        ...diamondStyle,
                                    }}
                                />

                                <div
                                    style={{
                                        position: 'absolute',
                                        zIndex: 2,
                                        fontSize: isCompleted || isError ? 14 : 12,
                                        fontWeight: 600,
                                        color: innerColor,
                                        lineHeight: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'color 0.25s',
                                    }}
                                >
                                    {isError ? (
                                        <i className="pi pi-times" style={{ fontSize: 12 }} />
                                    ) : isCompleted ? (
                                        <i className="pi pi-check" style={{ fontSize: 12 }} />
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                            </div>

                            <div
                                style={{
                                    marginTop: 8,
                                    fontSize: 12,
                                    fontWeight: isActive ? 600 : 400,
                                    color: labelColor,
                                    whiteSpace: 'nowrap',
                                    transition: 'color 0.25s',
                                    letterSpacing: 0.1,
                                }}
                            >
                                {step.label}
                            </div>

                            <Tooltip
                                target={`#${tooltipTarget}`}
                                className="step-tooltip"
                                position="top"
                                mouseTrack
                                mouseTrackTop={12}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export { STEPS };
export default ProgressBar;