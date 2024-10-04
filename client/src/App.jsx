import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import "./App.css"
import GetData from './GetData';

const App = () => {
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
        setError('');
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setError('');
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData);
            setFormData(response.data);
        } catch (err) {
            setError('Failed to process image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Visiting Card OCR</h1>
            <div {...getRootProps()} style={{ border: '2px dashed black', padding: '20px', textAlign: 'center' }}>
                <input {...getInputProps()} />
                <p>Drag & drop a visiting card image here, or click to select a file</p>
                {file && <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '200px' }} />}
            </div>
            <button onClick={handleUpload} disabled={loading || !file}>Upload</button>
            {loading && <p>Processing...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {formData.name && (
                <div className='container2'>
                    <h2>Extracted Information</h2>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Job Title:</strong> {formData.jobTitle}</p>
                    <p><strong>Company Name:</strong> {formData.companyName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone Number:</strong> {formData.phone}</p>
                    <p><strong>Address:</strong> {formData.address}</p>
                </div>
            )}
            
          <div>
            <GetData/>
          </div>

        </div>
    );
};

export default App;
