import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImageGallery from "./ImageGallery";

const Images = ({ userEmail }) => {
    const [imageUploaded, setImageUploaded] = useState(false);

    const handleImageUploaded = () => {
        setImageUploaded(!imageUploaded);
    };

    return (
        <div>
            <ImageUpload onImageUploaded={handleImageUploaded}/>
            <ImageGallery imageUploaded={imageUploaded} userEmail={userEmail} />
        </div>
    );
};

export default Images;