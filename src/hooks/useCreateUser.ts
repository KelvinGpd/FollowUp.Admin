// filepath: c:\Users\kkcsi\OneDrive\Desktop\checking in\FollowUp.admin\src\hooks\useCreateUser.ts
import { useState } from 'react';
import { User } from '../types/types';

const useCreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createUser = async (user: Omit<User, 'uuid'>) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVICE_URL}/data/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            const result = await response.json();
            return result;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            console.error('Error creating user:', err);
        } finally {
            setLoading(false);
        }
    };

    return { createUser, loading, error };
};

export default useCreateUser;