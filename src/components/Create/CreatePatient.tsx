"use client"

import React from "react"
import useCreateUser from "../../hooks/useCreateUser"
import "./create.css"

const CreatePatient = () => {
    const { createUser, loading, error } = useCreateUser()
    const [formData, setFormData] = React.useState({
        name: "",
        branchName: "",
        branchAddress: "",
        ailments: "",
        phoneNumber: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = {
            ...formData,
        }
        await createUser(user)
    }

    const fieldLabels: Record<string, string> = {
        name: "Name",
        branchName: "Branch Name",
        branchAddress: "Branch Address",
        ailments: "Symptoms",
        phoneNumber: "Phone Number",
    }

    return (
        <div className="patient-container">
            <div className="patient-card">
                <div className="patient-header">
                    <h1 style={{fontFamily: 'Gambetta'}}>Create Patient</h1>
                </div>
                <div className="patient-content">
                    <form onSubmit={handleSubmit}>
                        {Object.keys(formData).map((field, index) => (
                            <div key={index} className="form-group">
                                <label htmlFor={field}>{fieldLabels[field]}</label>
                                <input
                                    type="text"
                                    id={field}
                                    name={field}
                                    value={(formData as any)[field]}
                                    onChange={handleChange}
                                    placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
                                />
                            </div>
                        ))}

                        <button type="submit" disabled={loading} className="submit-button">
                            {loading ? "loading..." : "Create patient"}
                        </button>

                        {error && (
                            <div className="error-message">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                <p>{error}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePatient

