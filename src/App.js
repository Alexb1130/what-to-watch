import React, {Component} from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import MainPageUi from './components/mainPage/MainPageUi';
import MoviePageUi from './components/moviePage/MoviePageUi';
import SignIn from "./components/signIn/SignIn";
import { observer } from "mobx-react";
import AddReview from "./components/addReview/addReview";
import rootStore from './store';
import Favorites from './components/favorities/FavoritesUi';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const store = rootStore.authorizationStore;

    return (
        <Route
            {...rest}
            render={props => (
                store.isAuthorizationRequired ? <Redirect to="/login" /> : <Component {...props} />
            )}
        />
    )
}

@observer
class App extends Component {

    authorizationStore = rootStore.authorizationStore;
    filmsStore = rootStore.filmsStore;

    componentDidMount() {
        this.filmsStore.getFilms();
        this.authorizationStore.checkAuthorization()
    }

    render() {

        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={MainPageUi} />
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/films/:id" component={MoviePageUi} />
                    <PrivateRoute exact path="/favorite" component={Favorites} />
                    <PrivateRoute exact path="/films/:id/review" component={AddReview} />
                </Switch>
            </Router>
        )
    }
}

export default App;
