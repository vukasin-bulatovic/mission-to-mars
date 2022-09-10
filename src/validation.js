export const validatemail = (validate, mail) => {
  if (mail === "") {
    return "please fill in the input field";
  } else if (!validate) {
    return "please enter a corect email";
  }
};

export const validateName = (validate, name) => {
  if (name === "") {
    return "please fill in the input field";
  } else if (!validate) {
    return "please enter your name";
  }
};

export const validateBoxes = (boxes) => {
  if (boxes.length) {
    return "";
  } else if (!boxes.length) {
    return "please fill in the boxes";
  }
};

export const validateAdress = (adress) => {
  if (adress === "") {
    return "please fill in the input field";
  } else if (adress.length < 3) {
    return "please enter a real adress";
  }
};

export const validateState = (state) => {
  const re = /^[a-z ,.'-]+$/i;
  if (state === "") {
    return "please fill in the input field";
  } else if (!re.test(state)) {
    return "no numbers ";
  }
};

export const validateCodes = (code) => {
  const re = /^-?\d+\.?\d*$/;
  if (code === "") {
    return "please fill in the input field";
  } else if (!re.test(code)) {
    return "fill the fields correctly";
  }
};
export const validateYears = (years) => {
  if (years === "") return "please fill in the input field";
  else if (years > 100 || years < 0) {
    return "please input the field corectly";
  }
};

export const validateExactCode = (code) => {
  const ce = /^[0-9]{5}(-[0-9]{4})?$/;
  return ce.test(code);
};

export const validateTextArea = (text) => {
  if (text === "") return "Please fill in the field correctly";
};

export const titles = ["Mr", "Mrs", "Ms", "Miss", "Dr"];
