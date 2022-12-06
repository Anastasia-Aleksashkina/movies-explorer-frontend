import { Route, Switch } from "react-router-dom";
import Main from "../Main/Main";
import { PAGES } from "../../utils/constants";
import "./App.css";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

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
        <Route path={PAGES.SIGNUP} exact></Route>
      </Switch>
    </div>
  );
}

export default App;
