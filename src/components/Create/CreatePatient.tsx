import React from 'react';
import useCreateUser from '../../hooks/useCreateUser';

const CreatePatient = () => {
    const { createUser, loading, error } = useCreateUser(); 
    const [formData, setFormData] = React.useState({
        name: '',
        branchName: '',
        branchAddress: '',
        ailments: '',
        phoneNumber: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            ...formData,
        };
        await createUser(user);
    };

    return (
        <div className='create-patient'>
            <h1>Create Patient</h1>
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
                    {loading ? 'Creating...' : 'Create'}
                </button>
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    );
}

export default CreatePatient;