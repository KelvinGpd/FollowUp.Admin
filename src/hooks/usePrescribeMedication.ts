import { useState } from 'react';
import { Medication } from '../types/types';

const usePrescribeMedication = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const prescribeMedication = async (medication: Omit<Medication, 'uuid'>) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/data/prescriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(medication),
            });

            if (!response.ok) {
                throw new Error('Failed to prescribe medication');
            }

            const result = await response.json();
            return result;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            console.error('Error prescribing medication:', err);
        } finally {
            setLoading(false);
        }
    };

    return { prescribeMedication, loading, error };
};

export default usePrescribeMedication;