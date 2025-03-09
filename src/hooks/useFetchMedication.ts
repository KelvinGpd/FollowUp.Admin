import { useState, useEffect } from 'react';
import { Medication } from '../types/types';

const useFetchMedicationForUser = (user : string) => {
    const [data, setData] = useState<Medication[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVICE_URL}/data/medications/all`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filtered = data?.filter(medication => medication.patientName === user);
    return { data: filtered, loading };
};

export default useFetchMedicationForUser;