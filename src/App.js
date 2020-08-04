import React, {Component} from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import MainPageUi from './components/mainPage/MainPageUi';
import MoviePageUi from './components/moviePage/MoviePageUi';
import SignIn from "./components/signIn/SignIn";
import { observer } from "mobx-react";
import AddReview from "./components/addReview/addReview";
import Favorites from './components/favorities/FavoritesUi';
import { withStore, useStore } from './store';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { authorization } = useStore()

    return (
        <Route
            {...rest}
            render={props => (
                authorization.isAuthorizationRequired ? <Redirect to="/login" /> : <Component {...props} />
            )}
        />
    )
}

@observer
@withStore
class App extends Component {

    authorizationStore = this.props.store.authorization;
    filmsStore = this.props.store.films;

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
