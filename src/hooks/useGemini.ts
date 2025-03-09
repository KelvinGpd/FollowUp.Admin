// filepath: c:\Users\kkcsi\OneDrive\Desktop\checking in\FollowUp.admin\src\hooks\useGemini.ts
import { useEffect, useState } from 'react';

const useGemini = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);
    const [promptTemplate, setPromptTemplate] = useState<string | null>(null);

    useEffect(() => {
        const fetchPromptTemplate = async () => {
            try {
                const res = await fetch(`${process.env.PUBLIC_URL}/data/prompt.txt`);
                const text = await res.text();
                setPromptTemplate(text);
            } catch (err) {
                console.error('Error fetching prompt template:', err);
            }
        };

        fetchPromptTemplate();
    }, []);

    const generateContent = async (prescription: string) => {
        setLoading(true);
        setError(null);
        setResponse(null);

        const fullPrompt = `${promptTemplate}\n${prescription}`;

        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: fullPrompt }]
                    }]
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to generate content');
            }

            const result = await res.json();
            if (result.candidates && result.candidates[0] && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts[0]) {
                setResponse(result.candidates[0].content.parts[0].text);
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            console.error('Error generating content:', err);
        } finally {
            setLoading(false);
        }
    };

    return { generateContent, loading, error, response };
};

export default useGemini;