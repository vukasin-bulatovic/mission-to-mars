import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UseContext";
import { today } from "../../Input";
import { validateTextArea, validateBoxes } from "../../validation";
import {
  STEP_THREE,
  MANDITORY_FIELDS,
  BACK,
  CONTINUE,
  AGRICULTURE,
  METALWORK,
  SELECTION,
  CONVICTED,
  FLYING,
  CAR,
  BIKE,
  YES,
  NO,
  DESCRIPTION,
  FOR_WHAT,
  WHEN,
  ADD,
  REMOVE,
  MARKING,
  CUTTING,
  CUTTING_EXTERNAL,
  DRILLING,
  FILLING,
  JOINING,
} from "../../AllText/stepThree";

import { INPUT } from "../../AllText/text";

import "./ThirdPhase.scss";

function ThirdPhase() {
  const {
    agriculture,
    metalwork,
    convicted,
    airplane,
    car,
    bike,
    dispatch,
    boxes,
    convictedInputs,
    postData,
    handleCount,
    text,
  } = useContext(UserContext);
  const [fieldThree, setfieldThree] = useState(false);

  const handleCheckBox = (e, checkbox) => {
    e.target.checked
      ? dispatch({
          type: INPUT,
          value: [...boxes, checkbox],
          input: "boxes",
        })
      : dispatch({
          type: INPUT,
          value: [...boxes.filter((item) => item !== checkbox)],
          input: "boxes",
        });
  };

  const handlerBack = () => {
    handleCount(2);
  };

  const lastStep = (e) => {
    e.preventDefault();
    setfieldThree(true);
    if (
      convictedInputs[0].forWhat === "" &&
      convictedInputs[0].convictionDate === ""
    )
      convictedInputs.shift();
    if (!submitBtn) {
      postData();
    }
  };

  const handleRadio = (value, input) => {
    dispatch({
      type: INPUT,
      value: value,
      input: input,
    });
  };

  const submitBtn =
    agriculture === null ||
    (agriculture && validateTextArea(text)) ||
    metalwork === null ||
    (metalwork && !boxes.length) ||
    convicted === null ||
    (convicted && convictedInputs[0].forWhat === "") ||
    (convicted && convictedInputs[0].convictionDate === "") ||
    airplane === null ||
    car === null ||
    bike === null
      ? true
      : false;

  return (
    <div className="thirdPage">
      <header>
        <h2>{STEP_THREE}</h2>
        <p>
          {MANDITORY_FIELDS} <span className="star">*</span>
        </p>
      </header>
      <form>
        <div className="space onlyMargin">
          <p>{AGRICULTURE}</p>
          <input
            checked={
              agriculture === null
                ? ""
                : false
                ? !agriculture
                : true
                ? agriculture
                : ""
            }
            type="radio"
            value={agriculture || ""}
            id="yesBtn"
            name="yesorno"
            onChange={(e) => handleRadio(true, "agriculture")}
          />
            <label htmlFor="yesBtn">{YES}</label> {" "}
          <input
            checked={
              agriculture === null
                ? ""
                : true
                ? !agriculture
                : false
                ? agriculture
                : ""
            }
            value={agriculture || ""}
            id="noBtn"
            name="yesorno"
            type="radio"
            onChange={(e) => handleRadio(false, "agriculture")}
          />
            <label htmlFor="noBtn">{NO}</label>
        </div>

        {agriculture ? (
          <div className="description">
            <p>{DESCRIPTION}</p>
            <textarea
              value={text || ""}
              className="text"
              id=""
              cols="30"
              rows="5"
              onChange={(e) =>
                dispatch({
                  type: INPUT,
                  value: e.target.value,
                  input: "text",
                })
              }
            ></textarea>
            <br />
            <span className="textArea">
              {fieldThree && validateTextArea(text)}
            </span>
          </div>
        ) : null}

        <div className="metalwork onlyMargin">
          <p>{METALWORK}</p>
          <input
            checked={
              metalwork === null
                ? ""
                : false
                ? !metalwork
                : true
                ? metalwork
                : ""
            }
            value={metalwork || ""}
            name="metalwork"
            type="radio"
            onChange={(e) => handleRadio(true, "metalwork")}
          />
           <label>{YES}</label>{" "}
          <input
            checked={
              metalwork === null
                ? ""
                : true
                ? !metalwork
                : false
                ? metalwork
                : ""
            }
            value={metalwork || ""}
            name="metalwork"
            type="radio"
            onChange={(e) => handleRadio(false, "metalwork")}
          />
            <label>{NO}</label>
        </div>
        {metalwork ? (
          <div className="boxes">
            <p>{SELECTION}</p>
            <div className="checkBoxes">
              <div className="check">
                <input
                  checked={boxes.includes("Marking")}
                  value={boxes.includes("Marking") || ""}
                  type="checkbox"
                  name="Marking"
                  id=""
                  onChange={(e) => handleCheckBox(e, "Marking")}
                />
                <span>{MARKING}</span>
              </div>

              <div className="check">
                <input
                  checked={boxes.includes("Cutting")}
                  value={boxes.includes("Cutting") || ""}
                  type="checkbox"
                  name="Cutting"
                  id=""
                  onChange={(e) => handleCheckBox(e, "Cutting")}
                />
                <span>{CUTTING}</span>
              </div>
              <div className="check">
                <input
                  checked={boxes.includes("cuttingInternal")}
                  value={boxes.includes("cuttingInternal") || ""}
                  type="checkbox"
                  name="cuttingInternal"
                  id=""
                  onChange={(e) => handleCheckBox(e, "cuttingInternal")}
                />
                <span>{CUTTING_EXTERNAL}</span>
              </div>
              <div className="check">
                <input
                  checked={boxes.includes("Drilling")}
                  value={boxes.includes("Drilling") || ""}
                  type="checkbox"
                  onChange={(e) => handleCheckBox(e, "Drilling")}
                  name="Drilling"
                  id=""
                />
                <span>{DRILLING}</span>
              </div>

              <div className="check">
                <input
                  checked={boxes.includes("Filling")}
                  value={boxes.includes("Filling") || ""}
                  type="checkbox"
                  onChange={(e) => handleCheckBox(e, "Filling")}
                  name="Filling"
                  id=""
                />
                <span>{FILLING}</span>
              </div>
              <div className="check">
                <input
                  checked={boxes.includes("Joining")}
                  value={boxes.includes("Joining") || ""}
                  type="checkbox"
                  onChange={(e) => handleCheckBox(e, "Joining")}
                  name="Joining"
                  id=""
                />
                <span>{JOINING}</span>
              </div>
            </div>
            <span className="textArea">
              {fieldThree && validateBoxes(boxes)}
            </span>
          </div>
        ) : null}

        <div className="space onlyMargin">
          <p>{CONVICTED}</p>
          <input
            checked={
              convicted === null
                ? ""
                : false
                ? !convicted
                : true
                ? convicted
                : ""
            }
            value={convicted || ""}
            type="radio"
            name="convicted"
            onChange={(e) => handleRadio(true, "convicted")}
          />
            <label>{YES}</label> {" "}
          <input
            checked={
              convicted === null
                ? ""
                : true
                ? !convicted
                : false
                ? convicted
                : ""
            }
            value={convicted || ""}
            type="radio"
            onChange={(e) => {
              handleRadio(false, "convicted");
            }}
            name="convicted"
          />
            <label>{NO}</label>
        </div>
        {convicted &&
          convictedInputs.map((item, i) => {
            return (
              <div key={i} className="convictions">
                <div className="inputs">
                  <label htmlFor="reason">{FOR_WHAT} </label>
                  <textarea
                    value={item.forWhat}
                    onChange={(e) => {
                      item.forWhat = e.target.value;
                      dispatch({
                        type: INPUT,
                        value: [...convictedInputs, item.forWhat],
                        input: convictedInputs,
                      });
                    }}
                  />
                </div>
                <div className="inputs">
                  <label htmlFor="date">{WHEN} </label>
                  <input
                    max={today}
                    value={item.convictionDate}
                    onChange={(e) => {
                      item.convictionDate = e.target.value;
                      dispatch({
                        type: INPUT,
                        value: [...convictedInputs, item.convictionDate],
                        input: convictedInputs,
                      });
                    }}
                    className="date"
                    type="date"
                    selected={item.convictionDate}
                  />
                </div>
                {convictedInputs.length !== 1 &&
                convictedInputs.length - 1 === i ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      let newWhatandDateend = [...convictedInputs];
                      newWhatandDateend.splice(i);
                      dispatch({
                        type: INPUT,
                        value: newWhatandDateend,
                        input: "convictedInputs",
                      });
                    }}
                  >
                    {REMOVE}
                  </button>
                ) : null}
                {convictedInputs.length - 1 === i ? (
                  <button
                    disabled={
                      item.forWhat !== "" && item.convictionDate !== ""
                        ? false
                        : true
                    }
                    onClick={(e) => {
                      dispatch({
                        type: INPUT,
                        value: [
                          ...convictedInputs,
                          {
                            forWhat: "",
                            dateend: "",
                          },
                        ],
                        input: "convictedInputs",
                      });
                    }}
                  >
                    {ADD}
                  </button>
                ) : null}
              </div>
            );
          })}
        <div className=" space onlyMargin">
          <p>{FLYING}</p>
          <input
            checked={
              airplane === null ? "" : false ? !airplane : true ? airplane : ""
            }
            value={airplane || ""}
            type="radio"
            name="fly"
            onChange={(e) => handleRadio(true, "airplane")}
          />
            <label>{YES}</label> {" "}
          <input
            checked={
              airplane === null ? "" : true ? !airplane : false ? airplane : ""
            }
            value={airplane || ""}
            type="radio"
            name="fly"
            onChange={(e) => handleRadio(false, "airplane")}
          />
            <label>{NO}</label>
        </div>

        <div className="space onlyMargin">
          <p>{CAR}</p>
          <input
            checked={car === null ? "" : false ? !car : true ? car : ""}
            value={car || ""}
            type="radio"
            name="drive"
            onChange={(e) => handleRadio(true, "car")}
          />
            <label>{YES}</label> {" "}
          <input
            checked={car === null ? "" : true ? !car : false ? car : ""}
            value={car || ""}
            type="radio"
            name="drive"
            onChange={(e) => handleRadio(false, "car")}
          />
            <label>{NO}</label>
        </div>

        <div className="space onlyMargin">
          <p>{BIKE}</p>
          <input
            checked={bike === null ? "" : false ? !bike : true ? bike : ""}
            value={bike || ""}
            type="radio"
            name="bike"
            onChange={(e) => handleRadio(true, "bike")}
          />
            <label>{YES}</label> {" "}
          <input
            checked={bike === null ? "" : true ? !bike : false ? bike : ""}
            value={bike || ""}
            type="radio"
            onChange={(e) => handleRadio(false, "bike")}
          />
            <label>{NO}</label>
        </div>
        <div className="btn buttons">
          <button onClick={handlerBack} className="btnBack">
            {BACK}
          </button>
          <button onClick={lastStep} className="btnNext">
            {CONTINUE}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ThirdPhase;
