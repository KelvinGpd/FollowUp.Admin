import React, { useState, useEffect, CSSProperties } from 'react';
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
        <div style={styles.container}>
            <div>

            </div>
            <h1 >Prescribe Medication</h1>
            <form onSubmit={handlePromptSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor='prompt' style={styles.label}>Prompt</label>
                    <input
                        type='text'
                        id='prompt'
                        name='prompt'
                        value={prompt}
                        onChange={handlePromptChange}
                        style={styles.input}
                    />
                </div>
                <button type='submit' disabled={geminiLoading} style={geminiLoading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}>
                    Generate
                </button>
                {geminiError && <p style={styles.error}>{geminiError}</p>}
            </form>
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((field, index) => (
                    <div key={index} style={styles.formGroup}>
                        <label htmlFor={field} style={styles.label}>{fieldDisplayNames[field]}</label>
                        <input
                            type='text'
                            id={field}
                            name={field}
                            value={(formData as any)[field]}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>
                ))}
                <button type='submit' disabled={loading} style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}>
                    {loading ? 'Prescribing...' : 'Prescribe'}
                </button>
                {error && <p style={styles.error}>{error}</p>}
            </form>
        </div>
    );
};


const styles: { [key: string]: CSSProperties } = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center children horizontally
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '15px',
        //width: '100%',
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
        padding: '10px',
        backgroundColor: '#668586',
        color: 'white',
        fontSize: '16px',
        border: 'none',
        borderRadius: '4px',
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