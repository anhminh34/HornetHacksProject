import React, { createContext, useState } from 'react';

// Create a context for managing images
export const ImageContext = createContext();

// Create a provider component
export const ImageProvider = ({ children }) => {
    const [selectedBannerImage, setSelectedBannerImage] = useState(null);
    const [selectedProfileImage, setSelectedProfileImage] = useState(null);

    return (
        <ImageContext.Provider value={{
            selectedBannerImage,
            setSelectedBannerImage,
            selectedProfileImage,
            setSelectedProfileImage
        }}>
            {children}
        </ImageContext.Provider>
    );
};
