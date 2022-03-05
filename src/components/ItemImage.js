import React, { useState, useEffect } from "react";
const Buffer = require("buffer/").Buffer;

export default function ItemImage({ image }) {
  const [imageBase64, setImageBase64] = useState(null);

  useEffect(() => {
    console.log(image);

    if (!image) {
      setImageBase64(null);
      return;
    }

    if (!(image instanceof File)) {
      const buffer = Buffer.from(image.data.data);
      const imageString =
        "data:" + image.contentType + ";base64," + buffer.toString("base64");
      setImageBase64(imageString);
      return;
    }
    console.log("Hej");
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      setImageBase64(reader.result);
      console.log(reader.result);
    });
    reader.readAsDataURL(image);
  }, [image]);

  if (imageBase64)
    return <img src={imageBase64} alt="item" className="itemimage" />;
  else return <></>;
}
