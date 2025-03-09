import React, { useState, useEffect } from 'react';
import usePrescribeMedication from '../../hooks/usePrescribeMedication';
import useGemini from '../../hooks/useGemini';
import parseGeminiResponse from '../../utils/geminiHelpers';

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
        await generateContent(prompt);
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