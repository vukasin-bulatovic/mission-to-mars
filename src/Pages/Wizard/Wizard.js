import React, { useReducer } from "react";
import { useHistory } from "react-router-dom";
import FirstPhase from "../../Components/Phases/FirstPhase";
import SecondPhase from "../../Components/Phases/SecondPhase";
import ThirdPhase from "../../Components/Phases/ThirdPhase";
import { UserContext } from "../../Components/Context/UseContext";

import "./wizard.scss";
import {
  INPUT,
  ADRESS,
  ADRESS_STATE,
  DELETE,
  DELETE_TWO,
  DELETE_THREE,
  ADRESS_CITY,
  CONVICTED,
  RESTART,
  post,
} from "../../AllText/text";

import { postDataa } from "../../get&post/get&post";

const reducer = (state, action) => {
  switch (action.type) {
    case INPUT: {
      return {
        ...state,
        [action.input]: action.value,
      };
    }
    case ADRESS: {
      return {
        ...state,
        adress: { ...state.adress, [action.input]: action.value },
      };
    }

    case ADRESS_STATE: {
      return {
        ...state,
        adress: {
          ...state.adress,
          [action.input]: action.value,
          city: "",
          code: "",
        },
      };
    }

    case DELETE: {
      return {
        ...state,
        convictedInputs: [
          {
            forWhat: " ",
            convictionDate: "",
          },
        ],
      };
    }
    case DELETE_TWO: {
      return {
        ...state,
        mail: "",
        adressOne: "",
        adressTwo: "",
        state: "",
        city: "",
        code: "",
        years: null,
      };
    }

    case DELETE_THREE: {
      state = {};
    }
    case ADRESS_CITY: {
      return {
        ...state,
        adress: {
          ...state.adress,
          [action.input]: action.value,
          code: "",
        },
      };
    }

    case CONVICTED: {
      return {
        ...state,
        convictedInputs: [...state.convictedInputs],
      };
    }
    case RESTART: {
      return initialState;
    }

    default: {
      console.log("none of these cases");
    }
  }
};
const initialState = {
  mail: "",
  adress: {
    adressOne: "",
    adressTwo: "",
    state: "",
    city: "",
    tlaCountry: "",
    code: "",
  },
  years: null,
  text: "",
  title: "",
  name: "",
  lastName: "",
  disabled: true,
  startDate: "",
  agriculture: null,
  metalwork: null,
  convicted: null,
  convictedInputs: [
    {
      forWhat: "",
      convictionDate: "",
    },
  ],
  airplane: null,
  car: null,
  bike: null,
  boxes: [],
  count: 1,
  disabledend: true,
};

function Wizard({ setRead, setAgree }) {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    mail,
    adress,
    title,
    name,
    lastName,
    disabled,
    startDate,
    agriculture,
    metalwork,
    convicted,
    convictedInputs,
    airplane,
    car,
    bike,
    count,
    boxes,
    text,
    convictionDate,
    disabledend,
    tlaCountry,
    years,
  } = state;
  const handleCount = (num) => {
    dispatch({
      type: "input",
      value: num,
      input: "count",
    });
  };

  const body = {
    title: state.title,
    firstName: state.name,
    lastName: state.lastName,
    dateOfBirth: state.startDate,
    email: state.mail,
    residencyDuration: state.years,
    doesHaveAgricultureSkills: state.agriculture,
    agricultureSkills: !state.agriculture ? "some text" : state.text,
    doesHaveMetalworkSkills: state.metalwork,
    metalworkSkills: !state.boxes.join() ? "Cutting" : state.boxes.join(),
    isConvicted: state.convicted,
    doesFlyAirplane: state.airplane,
    doesDriveCar: state.car,
    doesDriveBicycle: state.bike,
    address: {
      addressLine1: state.adress.adressOne,
      addressLine2: state.adress.adressTwo,
      state: state.adress.state,
      city: state.adress.city,
      postalCode: state.adress.code,
    },
    convictions: !state.convicted ? [] : state.convictedInputs,
  };

  const postData = () => {
    postDataa(post, body)
      .then((response) => {
        console.log(response);
        if (response.status >= 200 && response.status <= 299) {
          alert("new user has been added");
          dispatch({
            type: "restart",
          });
          history.push("/intro");
          dispatch({
            type: DELETE_THREE,
          });
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="wizard">
      <UserContext.Provider
        value={{
          state,
          title,
          name,
          lastName,
          startDate,
          disabled,
          mail,
          adress,
          agriculture,
          metalwork,
          convicted,
          convictedInputs,
          airplane,
          car,
          bike,
          dispatch,
          text,
          boxes,
          convictionDate,
          disabledend,
          years,
          tlaCountry,
          postData,
          handleCount,
          setAgree,
          setRead,
        }}
      >
        {count === 1 ? (
          <FirstPhase count={count} />
        ) : count === 2 ? (
          <SecondPhase count={count} />
        ) : count === 3 ? (
          <ThirdPhase count={count} />
        ) : null}
      </UserContext.Provider>
    </div>
  );
}

export default Wizard;
