import React, { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
const Buffer = require("buffer/").Buffer;

export default function ItemImage({ image, placeholder }) {
  const [imageBase64, setImageBase64] = useState(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef();

  const intersectHandler = ([{ isIntersecting }], observer) => {
    setVisible(isIntersecting);
  };

  useIntersectionObserver({
    target: containerRef,
    intersectHandler,
    threshold: 0,
    rootMargin: "200px",
  });

  useEffect(() => {
    //console.log(image);

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
    // console.log("Hej");
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      setImageBase64(reader.result);
      // console.log(reader.result);
    });
    reader.readAsDataURL(image);
  }, [image]);

  return (
    <div className="itemimage" ref={containerRef}>
      {visible &&
        ((imageBase64 && <img src={imageBase64} alt="item" />) ||
          (placeholder && (
            <img
              src="https://via.placeholder.com/512/FFFFFF/000000?text=No+Image"
              alt="placeholder"
            ></img>
          )))}
    </div>
  );
}
