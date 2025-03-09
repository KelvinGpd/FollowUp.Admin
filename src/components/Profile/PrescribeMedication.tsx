import React, { useState, useEffect } from 'react';
import usePrescribeMedication from '../../hooks/usePrescribeMedication';
import useGemini from '../../hooks/useGemini';
import parseGeminiResponse from '../../utils/geminiHelpers';
import CameraSnap from './CameraSnap';

const PrescribeMedication = () => {
    const { prescribeMedication, loading, error } = usePrescribeMedication();
    const { generateContent, loading: geminiLoading, error: geminiError, response: geminiResponse } = useGemini();
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
    const [prompt, setPrompt] = useState('');
    const [imagePath, setImagePath] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
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
            body: JSON.stringify({ imagePath }),
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
        <div className='prescribe-medication'>
            <CameraSnap onCapture={handleImageCapture} />
            <h1>Prescribe Medication</h1>
            <form onSubmit={handlePromptSubmit}>
                <div className='form-group'>
                    <label htmlFor='prompt'>Prompt</label>
                    <input
                        type='text'
                        id='prompt'
                        name='prompt'
                        value={prompt}
                        onChange={handlePromptChange}
                    />
                </div>
                <button type='submit' disabled={geminiLoading}>
                    Generate
                </button>
                {geminiError && <p className='error'>{geminiError}</p>}
            </form>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((field, index) => (
                    <div key={index} className='form-group'>
                        <label htmlFor={field}>{field}</label>
                        <input
                            type='text'
                            id={field}
                            name={field}
                            value={(formData as any)[field]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type='submit' disabled={loading}>
                    {loading ? 'Prescribing...' : 'Prescribe'}
                </button>
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    );
};

export default PrescribeMedication;