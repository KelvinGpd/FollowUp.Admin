import React, { useState, useEffect, CSSProperties } from 'react';
import usePrescribeMedication from '../../hooks/usePrescribeMedication';
import useGemini from '../../hooks/useGemini';
import parseGeminiResponse from '../../utils/geminiHelpers';
import CameraSnap from './CameraSnap';

import "./style.css"

const PrescribeMedication = () => {
    const {prescribeMedication, loading, error} = usePrescribeMedication();
    const {generateContent, loading: geminiLoading, error: geminiError, response: geminiResponse} = useGemini();
    const [formData, setFormData] = useState({
        patientName: '',
        medicationName: '',
        consumptionDetails: '',
        prescriptionDate: '',
        expDate: '',
        interval: '',
        amount: '',
        dosage: ''
    });
    const fieldDisplayNames: { [key: string]: string } = {
        patientName: 'Patient Name',
        medicationName: 'Medication Name',
        consumptionDetails: 'Consumption Details',
        prescriptionDate: 'Prescription Date',
        expDate: 'Expiration Date',
        interval: 'Interval',
        amount: 'Amount',
        dosage: 'Dosage',
    };
    const [prompt, setPrompt] = useState('');
    const [imagePath, setImagePath] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const medication = {
            ...formData
        };
        await prescribeMedication(medication);
    };

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    const handlePromptSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (imagePath) {
            const fullPrompt = `${prompt} ${imagePath}`;
            await generateContent(fullPrompt);
        } else {
            await generateContent(prompt);
        }
    };

    const handleImageCapture = async (imagePath: string) => {
        setImagePath(imagePath);

        const response = await fetch('http://localhost:5000/process-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({imagePath}),
        });

        const result = await response.json();
        console.log("RESULT: ", JSON.stringify(result, null, 2));
        if (result.text) {
            const parsedResponse = parseGeminiResponse(result.text);
            setFormData({
                patientName: parsedResponse.patientName,
                medicationName: parsedResponse.medicationName,
                consumptionDetails: parsedResponse.consumptionDetails,
                prescriptionDate: parsedResponse.prescriptionDate,
                expDate: parsedResponse.expDate,
                interval: parsedResponse.interval,
                amount: parsedResponse.amount,
                dosage: parsedResponse.dosage,
            });
        }
    };

    useEffect(() => {
        if (geminiResponse) {
            console.log(geminiResponse);
            const parsedResponse = parseGeminiResponse(geminiResponse);
            setFormData({
                patientName: parsedResponse.patientName,
                medicationName: parsedResponse.medicationName,
                consumptionDetails: parsedResponse.consumptionDetails,
                prescriptionDate: parsedResponse.prescriptionDate,
                expDate: parsedResponse.expDate,
                interval: parsedResponse.interval,
                amount: parsedResponse.amount,
                dosage: parsedResponse.dosage,
            });
        }
    }, [geminiResponse]);

    return (
        <div className="prescribe-container">
            <div className="container">
                <CameraSnap onCapture={handleImageCapture}/>
                <h1 className="prescribe-title">Prescribe Medication</h1>

                <form onSubmit={handlePromptSubmit} className="prescribe-form">
                    <div className="form-group">
                        <label htmlFor="prompt" className="form-label">
                            Prompt
                        </label>
                        <input
                            type="text"
                            id="prompt"
                            name="prompt"
                            value={prompt}
                            onChange={handlePromptChange}
                            className="form-input"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={geminiLoading}
                        className={`form-button ${geminiLoading ? "button-disabled" : ""}`}
                    >
                        Generate
                    </button>
                    {geminiError && <p className="form-error">{geminiError}</p>}
                </form>

                <div className="form-divider"></div>

                <form onSubmit={handleSubmit} className="prescribe-form">
                    {Object.keys(formData).map((field, index) => (
                        <div key={index} className="form-group">
                            <label htmlFor={field} className="form-label">
                                {fieldDisplayNames[field as keyof typeof fieldDisplayNames]}
                            </label>
                            <input
                                type="text"
                                id={field}
                                name={field}
                                value={(formData as any)[field]}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>
                    ))}
                    <button type="submit" disabled={loading} className={`form-button ${loading ? "button-disabled" : ""}`}>
                        {loading ? "Prescribing..." : "Prescribe"}
                    </button>
                    {error && <p className="form-error">{error}</p>}
                </form>
            </div>

        </div>
    )
};


const styless: { [key: string]: CSSProperties } = {
    container: {
        margin: 20,
        width: "80%",
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center children horizontally
        backgroundColor: 'beige',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        width: '100%',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',

    },
    input: {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        display: 'flex',
        width: '100%',
        padding: '10',
        backgroundColor: '#668586',
        color: 'white',
        fontSize: 16,
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
}

export default PrescribeMedication;