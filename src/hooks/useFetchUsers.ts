import { useState, useEffect } from 'react';
import { User } from '../types/types';

const useFetchUsers = () => {
    const [data, setData] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVICE_URL}/data/users/all`, {
                    method: 'GET',
                    headers: new Headers({
                        "ngrok-skip-browser-warning": "69420",
                        "Content-type": "application/json; charset=UTF-8"
                      }),
                });
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

    return { data, loading };
};

export default useFetchUsers;