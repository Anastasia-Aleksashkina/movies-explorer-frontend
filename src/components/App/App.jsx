import { Route, Switch } from "react-router-dom";
import Main from "../Main/Main";
import { PAGES } from "../../utils/constants";
import "./App.css";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";

function App() {
  return (
    <div>
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
      </Switch>
    </div>
  );
}

export default App;
