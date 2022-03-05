import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import ItemImage from "./ItemImage";

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
    setUploadName(e.target.files[0].name);
    setImage(e.target.files[0]);
    fileInputRef.current.value = null;
  }

  useEffect(() => {
    if (!image) {
      setUploadName(null);
      return;
    }
  }, [image]);

  return (
    <div className="pictureform">
      {cameraEnabled && <Webcam ref={webcamRef} />}
      {!cameraEnabled && (
        <div className="pictureform-image">
          {image && <ItemImage image={image} alt="item" />}
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
