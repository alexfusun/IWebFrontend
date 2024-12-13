import React, { useState } from "react";
import { uploadFileToDropbox } from '../Dropbox/dropbox';

const ImageUpload = ({ onImageUploaded }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Validate file
        if (file && !file.type.startsWith("image/")) {
            alert("Please upload a valid image file.");
            return;
        }
        
        if (file && file.size > 5 * 1024 * 1024) { // 5MB size limit
            alert("File size must be less than 5MB.");
            return;
        }

        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                await uploadFileToDropbox(selectedFile);
                onImageUploaded();
                setSelectedFile(null);
            } catch (error) {
                console.log("Error subiendo imagen");
            }
        }
    };

    return (
        <div>
            <h2>Subir Imagen</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Subir imagen</button>
        </div>
    );
};

export default ImageUpload;