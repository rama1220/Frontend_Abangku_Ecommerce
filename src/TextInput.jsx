import React from "react";
import PropTypes from "prop-types";

function TextInput({ id, label, ...delegated }) {
  let generatedId = React.useId();
  let appliedId = id || generatedId;

  return (
    <>
      <label htmlFor={appliedId}>{label}</label>
      <input id={appliedId} {...delegated} />
    </>
  );
}

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default TextInput;
