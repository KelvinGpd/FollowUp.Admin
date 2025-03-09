import React, { useState } from 'react';
import usePrescribeMedication from '../../hooks/usePrescribeMedication';

const PrescribeMedication = () => {
    const { prescribeMedication, loading, error } = usePrescribeMedication();
    const [formData, setFormData] = useState({
        patientName: '',
        medicationName: '',
        consumptionDetails: '',
        prescriptionDate: '',
        expDate: '',
        interval: '',
        amount: '',
        dosage: '',
        lastTakenDate: '',
    });

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
            ...formData,
            amount: parseInt(formData.amount),
            dosage: parseInt(formData.dosage),
        };
        await prescribeMedication(medication);
    };

    return (
        <div className='prescribe-medication'>
            <h1>Prescribe Medication</h1>
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