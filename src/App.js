import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Privacy from "./Pages/Privacy/Privacy";
import Terms from "./Pages/Terms/Terms";
import Footer from "./Components/Footer/Footer";
import { Route, Switch, useLocation } from "react-router-dom";
import Intro from "./Pages/Intro/Intro";
import Wizard from "./Pages/Wizard/Wizard";
import { PRIVACY, TERMS, INTRO, WIZARD } from "./AllText/text";
import "./App.css";

function App() {
  const [blankFooter, setBlankFooter] = useState(true);
  const [read, setRead] = useState(false);
  const [agree, setAgree] = useState(false);
  const path = useLocation();
  useEffect(() => {
    if (path.pathname !== { INTRO }) {
      setBlankFooter(false);
    }
  }, [path]);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path={PRIVACY}>
          <Privacy />
        </Route>
        <Route exact path={TERMS}>
          <Terms />
        </Route>
        <Route exact path={INTRO}>
          <Intro
            setRead={setRead}
            setAgree={setAgree}
            read={read}
            agree={agree}
          />
        </Route>
        {read && agree ? (
          <Route exact path={WIZARD}>
            <Wizard setRead={setRead} setAgree={setAgree} />
          </Route>
        ) : (
          <Redirect to={INTRO} />
        )}
      </Switch>
      <Footer blankFooter={blankFooter} />
    </div>
  );
}

export default App;
