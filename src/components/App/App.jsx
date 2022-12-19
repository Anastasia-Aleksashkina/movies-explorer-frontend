import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import Main from "../Main/Main";
import { PAGES } from "../../utils/constants";
import "./App.css";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import NotFound from "../NotFound/NotFound";

function App() {
  const [menuActive, setmenuActive] = useState(false);

  function handleMenu() {
    setmenuActive((active) => !active);
  }
  return (
    <div className="app">
      <Header menuActive={menuActive} onMenu={handleMenu} />
      <main className="content">
        <Switch>
          <Route path={PAGES.MAIN} exact>
            <Main />
          </Route>
          <Route path={PAGES.MOVIES} exact>
            <Movies />
          </Route>
          <Route path={PAGES.SAVMOVIES} exact>
            <SavedMovies />
          </Route>
          <Route path={PAGES.PROFILE} exact>
            <Profile />
          </Route>
          <Route path={PAGES.SIGNUP} exact>
            <Register />
          </Route>
          <Route path={PAGES.SIGNIN} exact>
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
