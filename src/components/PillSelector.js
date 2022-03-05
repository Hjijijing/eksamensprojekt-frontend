import React from "react";

export default function PillSelector({ options, value, onChange }) {
  function clickHandler(e, option) {
    e.preventDefault();
    onChange(option);
  }

  return (
    <div className="pill-selector">
      {options.map((option) => {
        return (
          <button
            className={
              "card pill-selector-button" +
              (option.value === value ? " selected-pill" : "")
            }
            key={option.value}
            onClick={(e) => {
              clickHandler(e, option.value);
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
