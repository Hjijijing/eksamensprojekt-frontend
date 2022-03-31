import React from "react";
import { SiTwitter } from "react-icons/si";
import IconButton from "./IconButton";

export default function TwitterButton({ clickHandler, text }) {
  return (
    <IconButton
      clickHandler={clickHandler}
      text={text}
      icon={<SiTwitter />}
      bg="#1da1f2"
      col="white"
    />
  );
}
