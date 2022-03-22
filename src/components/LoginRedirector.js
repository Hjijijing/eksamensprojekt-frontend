import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirector({ to }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, []);

  return <></>;
}
