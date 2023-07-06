import React from "react";

const Inputs = (props) => {
  let formInput = null;
  switch (props.type) {
    case "select":
      formInput = (
        <div className="mb-3" controlId="formBasicEmail">
          {props.label && (
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {props.label}
            </label>
          )}
          <select
            className="form-control form-control-sm"
            value={props.value}
            onChange={props.onChange}
          >
            <option value="">{props.placeholder}</option>
            {props.options.length > 0
              ? props.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                ))
              : null}
          </select>
        </div>
      );
      break;
    case "text":
    default:
      formInput = (
        <div className="mb-2  w-full max-w-xs">
          {props.label && (
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {props.label}
            </label>
          )}
          <input
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            id={props.id}
            onChange={props.handleChange}
            {...props}
          />
        </div>
      );
  }

  return formInput;
};

export default Inputs;
