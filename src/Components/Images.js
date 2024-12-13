import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImageGallery from "./ImageGallery";

const Images = () => {
    const [imageUploaded, setImageUploaded] = useState(false);

    const handleImageUploaded = () => {
        setImageUploaded(!imageUploaded);
    };

    return (
        <div>
            <ImageUpload onImageUploaded={handleImageUploaded}/>
            <ImageGallery imageUploaded={imageUploaded} />
        </div>
    );
};

export default Images;