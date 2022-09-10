import { React, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  APPLICATION_WIZARD,
  START_PROCCES,
  PRIVACY_NOTICE,
  AND,
  TERMS_AND_CONDITIONS,
  AGREE,
  READ,
  PROCCED,
} from "../../AllText/text";
import "./Intro.scss";

function Intro({ setAgree, setRead, agree, read }) {
  const history = useHistory();
  const goFoward = () => {
    history.push("/wizard");
  };
  useEffect(() => {
    setAgree(false);
    setRead(false);
  }, []);

  return (
    <>
      <h2 className="application">{APPLICATION_WIZARD}</h2>
      <div className="terms">
        <p>
          {START_PROCCES} {<Link to="./privacy">{PRIVACY_NOTICE}</Link>}
          {AND}
          {<Link to="./terms">{TERMS_AND_CONDITIONS}</Link>} {AGREE}
        </p>
        <div className="agremment">
          <div>
            <input
              type="checkbox"
              onChange={() => setRead(!read)}
              name=""
              id=""
            />
            <span>{READ}</span>
            <br />
            <input
              type="checkbox"
              onChange={() => setAgree(!agree)}
              name=""
              id=""
            />
            <span>{READ}</span>
          </div>
          <button
            disabled={read && agree ? false : true}
            onClick={goFoward}
            className="proced"
          >
            {PROCCED}
          </button>
        </div>
      </div>
    </>
  );
}

export default Intro;
