import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group col-lg-3 col-md-6 col-sm-8 col-xs-10 mx-auto">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
