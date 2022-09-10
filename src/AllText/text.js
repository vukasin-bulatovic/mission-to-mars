import axios from "axios";
import { url } from "./stepTwo";

const APPLICATION_WIZARD = "Aplication Wizard";
const START_PROCCES =
  "You are about to start the application process for EY-NASA mission to Mars. Please read";
const PRIVACY_NOTICE = "„Privacy Notice“";
const AND = "and";
const TERMS_AND_CONDITIONS = "„Terms and Conditions“";
const AGREE =
  "before giving your consent. If you agree, EY and NASA will use the data for the purposes of the legitimate interest(s) of the Mars mission.The specific legitimate interest(s) are the provision of mission planning and are for internal use by EY and NASA employees";
const READ = "I have read the above-mentioned documents";
const PROCCED = "Procced";
const INPUT = "input";
const ADRESS = "adress";
const ADRESS_STATE = "adressState";
const DELETE = "deleteOne";
const DELETE_TWO = "deleteTwo";
const DELETE_THREE = "deleteThree";
const ADRESS_CITY = "adressCity";
const CONVICTED = "convicted";
const RESTART = "restart";
const PRIVACY = "/privacy";
const TERMS = "/terms";
const INTRO = "/intro";
const WIZARD = "/wizard";
const TITLE_TEXT = "Title";

export const postDataa = (url, data) => {
  const body = {
    title: data.title,
    firstName: data.name,
    lastName: data.lastName,
    dateOfBirth: data.startDate,
    email: data.mail,
    residencyDuration: data.years,
    doesHaveAgricultureSkills: data.agriculture,
    agricultureSkills: !data.agriculture ? "some text" : data.text,
    doesHaveMetalworkSkills: data.metalwork,
    metalworkSkills: !data.boxes.join() ? "Cutting" : data.boxes.join(),
    isConvicted: data.convicted,
    doesFlyAirplane: data.airplane,
    doesDriveCar: data.car,
    doesDriveBicycle: data.bike,
    address: {
      addressLine1: data.adress.adressOne,
      addressLine2: data.adress.adressTwo,
      state: data.adress.state,
      city: data.adress.city,
      postalCode: data.adress.code,
    },
    convictions: data.convictedInputs,
  };
  return axios.post(url, body);
};

const post = `${url}/recruits`;
export {
  PRIVACY,
  post,
  WIZARD,
  TITLE_TEXT,
  TERMS,
  INTRO,
  APPLICATION_WIZARD,
  START_PROCCES,
  PRIVACY_NOTICE,
  AND,
  TERMS_AND_CONDITIONS,
  AGREE,
  READ,
  PROCCED,
  INPUT,
  ADRESS,
  ADRESS_STATE,
  DELETE,
  DELETE_TWO,
  DELETE_THREE,
  ADRESS_CITY,
  CONVICTED,
  RESTART,
};
