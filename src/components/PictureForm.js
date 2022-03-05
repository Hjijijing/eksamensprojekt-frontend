import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import ItemImage from "./ItemImage";

const handleDragEnter = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
const handleDragLeave = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export default function PictureForm({ width, image, setImage }) {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const [uploadName, setUploadName] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  async function takePicture() {
    setCameraEnabled(false);
    const image = webcamRef.current.getScreenshot();
    const res = await fetch(image);
    const blob = await res.blob();
    setUploadName(null);
    setImage(new File([blob], "capture.webp", { type: "image/webp" }));
  }

  function openFileInput() {
    fileInputRef.current?.click();
  }

  function fileSelected(e) {
    e.stopPropagation();
    e.preventDefault();
    selectFile(e.target.files[0]);
  }

  function selectFile(file) {
    if (file && file.type.split("/")[0] === "image") {
      setUploadName(file.name);
      setImage(file);
    } else {
      alert("Invalid file");
    }
    fileInputRef.current.value = null;
  }

  useEffect(() => {
    if (!image) {
      setUploadName(null);
      return;
    }
  }, [image]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length === 1) {
      selectFile(e.dataTransfer.items[0].getAsFile());
    }
  };

  return (
    <div
      className="pictureform"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnter={handleDragEnter}
    >
      {cameraEnabled && <Webcam ref={webcamRef} />}
      {!cameraEnabled && (
        <div className="pictureform-image">
          <ItemImage image={image} placeholder={true} />
        </div>
      )}
      <div className="pictureform-options">
        {cameraEnabled && (
          <button className="card" type="button" onClick={takePicture}>
            Take Picture
          </button>
        )}
        {!cameraEnabled && (
          <button className="card" type="button" onClick={openFileInput}>
            {uploadName ?? "Upload Image"}
          </button>
        )}
        <button
          className="card"
          type="button"
          onClick={() => {
            setCameraEnabled((enabled) => !enabled);
          }}
        >
          {cameraEnabled ? "Disable Camera" : "Enable Camera"}
        </button>
        <input
          id="pictureform-fileinput"
          type="file"
          label="Choose File"
          ref={fileInputRef}
          onChange={fileSelected}
        />
      </div>
    </div>
  );
}
