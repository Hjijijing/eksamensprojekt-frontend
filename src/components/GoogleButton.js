import React from "react";
import { FcGoogle } from "react-icons/fc";
import IconButton from "./IconButton";

export default function GoogleButton({ text, clickHandler }) {
  return (
    <IconButton
      clickHandler={clickHandler}
      text={text}
      icon={<FcGoogle style={{ backgroundColor: "white" }} />}
      bg="#4285F4"
      col="white"
    />
  );
}
