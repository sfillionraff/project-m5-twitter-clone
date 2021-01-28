// import logo from './logo.svg';
import './App.css';
import { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import TweetDetails from './TweetDetails';
import HomeFeed from './HomeFeed';
import Notifications from './Notifications';
import Bookmarks from './Bookmarks';
import Profile from './Profile';
import Sidebar from './Sidebar';
import Loader from './Loading';
import Error from './ErrorPage';

import { CurrentUserContext } from "./CurrentUserContext";

function App() {
  const {status} = useContext(CurrentUserContext);
  return (
    <BrowserRouter>
      {status === "loading"
        ? <Loader />
        :
        <>
          <Sidebar />
            <Switch>
              <Route exact path="/bookmarks">
                <Bookmarks />
              </Route>
              <Route exact path="/notifications">
                <Notifications />
              </Route>
              <Route exact path="/tweet/:tweetId">
                <TweetDetails />
              </Route>
              <Route exact path="/:handle">
                <Profile />
              </Route>
              <Route exact path="/">
                <HomeFeed />
              </Route>
              <Route exact path="">
                <Error />
              </Route>
            </Switch>
        </>
      }
    </BrowserRouter>
  );
}

export default App;