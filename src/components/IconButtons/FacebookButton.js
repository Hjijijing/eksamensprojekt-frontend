import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import IconButton from "./IconButton";

export default function FacebookButton({ text, clickHandler }) {
  return (
    <IconButton
      clickHandler={clickHandler}
      text={text}
      icon={<AiFillFacebook />}
      bg="#4267B2"
      col="white"
    />
  );
}
