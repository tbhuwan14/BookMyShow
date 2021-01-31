import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group col-lg-3 col-md-6 col-sm-8 col-xs-12 mx-auto">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
