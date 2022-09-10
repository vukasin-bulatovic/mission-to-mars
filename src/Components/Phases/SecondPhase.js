import React, { useContext, useEffect, useState } from "react";
import "./SecondPhase.scss";
import { UserContext } from "../Context/UseContext";
import Input from "../../Input";
import {
  STEP_TWO,
  MANDITORY_FIELDS,
  BACK,
  CONTINUE,
  STAR,
  EMAIL,
  ADRESS_ONE,
  ADRESS_TWO,
  STATE,
  CITY,
  CODE,
  YEARS,
  MAIL,
  ADRESS,
  YEARS_FIELD,
  url,
} from "../../AllText/stepTwo";

import { INPUT } from "../../AllText/text";
import { getData } from "../../get&post/get&post";
import {
  validateExactCode,
  validatemail,
  validateAdress,
  validateState,
  validateCodes,
  validateYears,
} from "../../validation";

const SecondPhase = () => {
  const { mail, dispatch, adress, years, handleCount } =
    useContext(UserContext);

  const [fieldTwo, setfieldTwo] = useState(false);
  const [dataStates, setDataStates] = useState([]);
  const [dataCities, setDataCities] = useState([]);
  const [dataCodes, setDataCodes] = useState([]);
  const [tla, setTla] = useState("");
  const [cityName, setCityName] = useState("");
  const [disableList, setDisableList] = useState(true);

  const handleCode = (e, elem) => {
    dispatch({
      type: ADRESS,
      value: elem,
      input: "code",
    });
  };

  const handleCity = (e, elem) => {
    setCityName(elem.name);
    dispatch({
      type: ADRESS,
      value: elem,
      input: "city",
    });
  };

  const handleState = (e, elem) => {
    dispatch({
      type: ADRESS,
      value: elem,
      input: "state",
    });

    dispatch({
      type: ADRESS,
      value: elem,
      input: "tlaCountry",
    });
  };

  const urlStates = `${url}/states`;
  const urlCities = `${url}/cities`;
  const urlCodes = `${url}/codes`;

  useEffect(() => {
    getData(urlStates)
      .catch((err) => alert(err))
      .then((res) => {
        setDataStates(res.data);
      });
  }, [urlStates]);

  useEffect(() => {
    if (dataStates) {
      getData(urlCities)
        .catch((err) => alert(err))
        .then((res) => {
          setDataCities(res.data);
        });
    }
  }, [dataStates, urlCities]);

  useEffect(() => {
    if (dataCities)
      getData(urlCodes)
        .catch((err) => alert(err))
        .then((res) => {
          console.log(res.data);
          setDataCodes(res.data);
        });
  }, [dataCities, urlCodes]);

  const validateMail = (mail) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
  };

  const validate = (val) => {
    const pattern = /^[a-z ,.'-]+$/i;
    return pattern.test(val);
  };

  const validateCode = (val) => {
    const pattern = /^-?\d+\.?\d*$/;
    return pattern.test(val);
  };

  const handleToLastPage = (e) => {
    e.preventDefault();
    setfieldTwo(true);
    if (!goToLastPage) {
      dispatch({
        type: INPUT,
        input: "count",
        value: 3,
      });
    }
  };

  const combined = (e, elem, disableList) => {
    handleCode(e, elem);
    setDisableList(!disableList);
  };

  const goToLastPage =
    validateMail(mail) &&
    validate(adress.state) &&
    validate(adress.city) &&
    validateCode(adress.code) &&
    validateExactCode(adress.code) &&
    adress.adressOne !== "" &&
    adress.city !== "" &&
    adress.code !== "" &&
    years > 0 &&
    years < 100
      ? false
      : true;

  return (
    <div className="secondPage">
      <header>
        <h2>{STEP_TWO}</h2>
        <p>
          {MANDITORY_FIELDS} <span className="star">{STAR}</span>
        </p>
      </header>
      <form>
        <div className="mail onlyMargin">
          <label htmlFor="email">{EMAIL}</label>
          <br />
          <Input
            value={mail || ""}
            type="text"
            placeholder={MAIL}
            caseInput="input"
            inputField="mail"
          />
          <br />
          <span> {fieldTwo && validatemail(validateMail(mail), mail)}</span>
        </div>

        <div className="adress onlyMargin ">
          <div className="adressInput">
            <label htmlFor="adressOne">{ADRESS_ONE}</label>
            <br />
            <Input
              type="text"
              value={adress.adressOne || ""}
              placeholder={ADRESS}
              caseInput="adress"
              inputField="adressOne"
            />
            <br />
            <span>{fieldTwo && validateAdress(adress.adressOne)}</span>
          </div>
          <div className="adressInput">
            <label htmlFor="adressTwo">{ADRESS_TWO}</label>
            <br />
            <Input
              type="text"
              value={adress.adressTwo}
              placeholder={ADRESS}
              caseInput="adress"
              inputField="adressTwo"
            />
          </div>
        </div>
        <div className="location onlyMargin ">
          <div className="dropdown">
            <label className="city-label">
              <span>{STAR}</span>
              {STATE}
            </label>
            <br />
            <Input
              type="text"
              value={adress.state || ""}
              placeholder={STATE}
              caseInput="adressState"
              inputField="state"
            />
            <br />
            <span>{fieldTwo && validateState(adress.state)}</span>
            <ul id="stateList">
              {dataStates &&
                dataStates.map((elem) => {
                  return elem.toLowerCase().includes(adress.state) &&
                    adress.state.length > 1 ? (
                    <li
                      onClick={(e) => {
                        handleState(e, elem);
                      }}
                      value={elem}
                      key={elem}
                    >
                      {elem}
                    </li>
                  ) : null;
                })}
            </ul>
          </div>

          <div className="dropdown">
            <label className="city-label">
              <span>{STAR}</span>
              {CITY}
            </label>
            <br />
            <Input
              type="text"
              disabled={adress.state.length < 3 ? true : false}
              value={adress.city || ""}
              placeholder={CITY}
              caseInput="adressCity"
              inputField="city"
            />
            <br />
            <span>{fieldTwo && validateState(adress.city)}</span>

            <ul id="cityList">
              {dataCities &&
                dataCities.length > 0 &&
                dataCities.map((elem) => {
                  return elem.toLowerCase().includes(adress.city) &&
                    adress.city.length > 1 ? (
                    <li
                      onClick={(e) => {
                        handleCity(e, elem);
                      }}
                      value={elem}
                      key={elem}
                    >
                      {elem}
                    </li>
                  ) : null;
                })}
            </ul>
          </div>
          <div className="dropdown">
            <label htmlFor="PostalCode">{CODE}</label>
            <br />
            <Input
              type="text"
              disabled={adress.city.length < 4 ? true : false}
              value={adress.code || ""}
              placeholder={CODE}
              caseInput="adress"
              inputField="code"
              setDisableList={setDisableList}
            />
            <br />
            <span>{fieldTwo && validateCodes(adress.code)}</span>
            <ul id="stateList" className={!disableList ? "disabled" : ""}>
              {dataCodes.length > 0 &&
                dataCodes.map((elem) => {
                  if (elem.includes(adress.code) && adress.code.length > 1) {
                    return (
                      <li
                        onClick={(e) => {
                          combined(e, elem, disableList);
                        }}
                        value={elem}
                        key={elem}
                      >
                        {elem}
                      </li>
                    );
                  } else return null;
                })}
            </ul>
          </div>
        </div>
        <div className="years onlyMargin ">
          <label htmlFor="number">{YEARS}</label>
          <br />
          <Input
            type="number"
            value={years || ""}
            placeholder={YEARS_FIELD}
            caseInput="input"
            inputField="years"
          />
          <br />
          <span>{fieldTwo && validateYears(years)}</span>
        </div>
        <div className="btn buttons">
          <button
            onClick={() => {
              handleCount(1);
            }}
            className="btnBack"
          >
            {BACK}
          </button>
          <button onClick={handleToLastPage} className="btnNext">
            {CONTINUE}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecondPhase;
