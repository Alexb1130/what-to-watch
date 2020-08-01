import React, {Component} from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import MainPageUi from './components/mainPage/MainPageUi';
import MoviePageUi from './components/moviePage/MoviePageUi';
import SignIn from "./components/signIn/SignIn";
import { observer } from "mobx-react";
import AddReview from "./components/addReview/addReview";
import rootStore from './store';
import Favorites from './components/favorities/FavoritesUi';

@observer
class App extends Component {

    authorizationStore = rootStore.authorizationStore;
    filmsStore = rootStore.filmsStore;
    userStore = rootStore.userStore;

    componentDidMount() {
        this.userStore.getUser();
        this.filmsStore.getFilms();
        this.authorizationStore.checkAuthorization()
    }

    render() {

        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPageUi} />
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/favorite" component={Favorites} />
                    <Route exact path="/films/:id" component={MoviePageUi} />
                    <Route exact path="/films/:id/review" render={props => {
                        return this.authorizationStore.isAuthorizationRequired ? <Redirect to="/login" /> : <AddReview {...props} />
                    }} />
                </Switch>
            </Router>
        )
    }
}

export default App;
