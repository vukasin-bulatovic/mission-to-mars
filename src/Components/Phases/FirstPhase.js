import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/UseContext";
import Input from "../../Input";
import { INPUT, TITLE_TEXT, DELETE } from "../../AllText/text";
import {
  STEP_ONE,
  MANDITORY_FIELDS,
  STAR,
  TITLE,
  DATE_OF_BIRTH,
  BACK,
  CONTINUE,
  TEXT_TITLE,
  FIRST_NAME,
  LAST_NAME,
  BIRTH,
} from "../../AllText/stepOne";
import { validateName, titles } from "../../validation";
import "./FirstPhase.scss";

function FirstPhase() {
  const history = useHistory();
  const { title, name, lastName, startDate, dispatch } =
    useContext(UserContext);
  const goBack = () => {
    history.push("/intro");
  };

  const [field, setField] = useState(false);

  const setTitle = (e) => {
    dispatch({
      type: INPUT,
      value: e.target.value,
      input: "title",
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setField(true);
    if (!goNext) {
      dispatch({
        type: INPUT,
        input: "count",
        value: 2,
      });
      dispatch({
        type: DELETE,
      });
    }
  };

  const backButton = () => {
    goBack();
  };

  const validate = (val) => {
    const pattern = /^[a-z ,.'-]+$/i;
    return pattern.test(val);
  };

  const validateBlank = (val) => {
    const pattern = /^\S+(?: \S+)*$/;
    return pattern.test(val);
  };

  const goNext =
    validateBlank(name) &&
    validateBlank(lastName) &&
    validate(name) &&
    validate(lastName) &&
    name !== "" &&
    lastName !== "" &&
    title &&
    startDate
      ? false
      : true;

  return (
    <div className="first">
      <header>
        <h2>{STEP_ONE}</h2>
        <p>
          {MANDITORY_FIELDS}
          <span className="star">{STAR}</span>
        </p>
      </header>
      <form>
        <div className="fields title">
          <label htmlFor="title">{TITLE}</label>
          <br />
          <select
            value={title}
            className="inputFields"
            name="title"
            id="title"
            placeholder={TEXT_TITLE}
            onChange={setTitle}
          >
            <option>{TITLE_TEXT}</option>
            {titles.map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="fields fullName">
          <div className="name">
            <Input
              value={name || ""}
              className="inputFields"
              type="text"
              placeholder={FIRST_NAME}
              caseInput="input"
              inputField="name"
            />
            <br />
            <span>{field && validateName(validate(name), name)}</span>
          </div>
          <div className="name">
            <Input
              value={lastName || ""}
              className="inputFields"
              type="text"
              placeholder={LAST_NAME}
              caseInput="input"
              inputField="lastName"
            />
            <br />
            <span>{field && validateName(validate(lastName), lastName)}</span>
          </div>
        </div>
        <div className="fields">
          <label htmlFor="date">{DATE_OF_BIRTH}</label>
          <br />
          <Input
            value={startDate || ""}
            className="inputFields"
            type="date"
            placeholder={BIRTH}
            caseInput="input"
            inputField="startDate"
          />
        </div>
        <div className="btn buttons">
          <button onClick={backButton} className="btnBack">
            {BACK}
          </button>
          <button onClick={handleNext} className="btnNext">
            {CONTINUE}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FirstPhase;
