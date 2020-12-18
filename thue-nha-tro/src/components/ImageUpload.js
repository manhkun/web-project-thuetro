import React from "react";
import "./ImageUpload.css";

export const ImageUpload = ({
  selectedFiles,
  setSelectedFiles,
  handleImageChange,
}) => {
  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <div className="img-container">
          {setSelectedFiles && (
            <img
              src="icons/close.png"
              alt=""
              className="close-btn"
              onClick={(e) => removeImage(e, source, photo)}
            />
          )}
          <img className="icon" src={URL.createObjectURL(photo)} />
        </div>
      );
    });
  };

  const removeImage = (e, source, img) => {
    e.preventDefault();
    setSelectedFiles(source.filter((image) => image !== img));
  };

  return (
    <div>
      <div className="image-upload">
        {renderPhotos(selectedFiles)}
        {handleImageChange && (
          <label htmlFor="file-input">
            <img className="icon" src="icons/camera 1.png" />
          </label>
        )}
        {handleImageChange && (
          <input id="file-input" type="file" onChange={handleImageChange} />
        )}
      </div>
    </div>
  );
};
