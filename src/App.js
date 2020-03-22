import React, {Component} from 'react';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import MainPageUi from './components/mainPage/MainPageUi';
import MoviePageUi from './components/moviePage/MoviePageUi';
import SignIn from "./components/signIn/SignIn";
import authorizationStore from "./store/authorizationStore";
import { observer } from "mobx-react";

@observer
class App extends Component {
    render() {

        const { isAuthorizationRequired } = authorizationStore;

        return(
            <Router>
                <Switch>
                    <Route exact path="/">
                        {isAuthorizationRequired ? <SignIn /> : <MainPageUi />}
                    </Route>
                    <Route exact path="/movie-page">
                        <MoviePageUi />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
