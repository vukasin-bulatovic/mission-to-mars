import React, { useContext } from "react";
import { UserContext } from "./Components/Context/UseContext";

const Input = ({
  caseInput,
  value,
  inputField,
  type,
  className,
  fname,
  placeholder,
  disabled,
}) => {
  const { dispatch } = useContext(UserContext);

  const handleChange = (e) => {
    dispatch({
      type: caseInput,
      value: e.target.value,
      input: inputField,
    });
  };

  return (
    <input
      max={today}
      type={type}
      value={value}
      className={className}
      name={fname}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
    />
  );
};
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; //January is 0!
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = `0${dd}`;
}
if (mm < 10) {
  mm = `0${mm}`;
}

today = `${yyyy}-${mm}-${dd}`;
export { today };

export default Input;
