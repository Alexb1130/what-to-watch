import React, {Component} from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import MainPageUi from './components/mainPage/MainPageUi';
import MoviePageUi from './components/moviePage/MoviePageUi';
import SignIn from "./components/signIn/SignIn";
import authorizationStore from "./store/authorizationStore";
import { observer } from "mobx-react";
import filmsStore from "./store/filmsStore";
import AddReview from "./components/addReview/addReview";

@observer
class App extends Component {

    componentDidMount() {
        filmsStore.getFilms();
        authorizationStore.checkAuthorization()
    }

    render() {

        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPageUi} />
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/films/:id" component={MoviePageUi} />
                    <Route exact path="/films/:id/review" render={props => {
                        return authorizationStore.isAuthorizationRequired ? <Redirect to="/login" /> : <AddReview {...props} />
                    }} />
                </Switch>
            </Router>
        )
    }
}

export default App;
