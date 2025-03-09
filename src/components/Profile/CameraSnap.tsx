import React, { useRef, useState } from 'react';

interface CameraSnapProps {
    onCapture: (imageData: string) => void;
}

const CameraSnap: React.FC<CameraSnapProps> = ({ onCapture }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [capturing, setCapturing] = useState(false);

    const startCapture = async () => {
        setCapturing(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            setCapturing(false);
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const imageData = canvasRef.current.toDataURL('image/png');
                saveImage(imageData);
            }
        }
    };

    const saveImage = async (imageData: string) => {
        const response = await fetch('http://localhost:5000/save-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageData }),
        });

        const result = await response.json();
        if (result.imagePath) {
            onCapture(result.imagePath);
        }
    };

    const handleCapture = () => {
        startCapture();
        setTimeout(() => {
            captureImage();
            setCapturing(false);
        }, 7000);
    };

    return (
        <div>
            <button onClick={handleCapture} disabled={capturing}>
                {capturing ? 'Capturing...' : 'Open Camera'}
            </button>
            <div>
                <video ref={videoRef} style={{ display: capturing ? 'block' : 'none' }} width="640" height="480"></video>
                <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
            </div>
        </div>
    );
};

export default CameraSnap;