import React, { useEffect, useState } from "react";
import { listFilesInDropbox, getFileLink } from "../Dropbox/dropbox";

const ImageGallery = ({ imageUploaded }) => {
    const [images, setImages] = useState([]);

    
    const fetchImages = async () => {
        try {
            const files = await listFilesInDropbox();
            if (!files || files.length === 0) {
                console.log('No files found in Dropbox.');
                setImages([]); // Handle empty file list
                return;
            }

            const imageLinks = await Promise.all(
                files.map(async (file) => {
                    const link = await getFileLink(file.path_display);
                    return link;
                })
            );
            setImages(imageLinks);
        } catch (error) {
            console.error('Error fetching images', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [imageUploaded]);

    return (
        <div>
            <h2>Galería de imágenes</h2>
            <div>
                {images.map((link, index) => (
                    <img key={index} src={link} alt={`Uploaded ${index}`} width="200" height="200" />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;