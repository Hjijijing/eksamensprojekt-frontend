import React from "react";
import { AiFillGithub } from "react-icons/ai";
import IconButton from "./IconButton";

export default function GithubButton({ clickHandler, text }) {
  return (
    <IconButton
      clickHandler={clickHandler}
      text={text}
      icon={<AiFillGithub />}
      bg="black"
      col="white"
    />
  );
}
