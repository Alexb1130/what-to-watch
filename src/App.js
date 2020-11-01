import React, {useEffect} from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import { observer } from "mobx-react";
import { useStore } from '@/store';

import MainPageUi from '@/pages/main/MainPageUi';
import MoviePageUi from '@/pages/movie/MoviePageUi';
import SignIn from "@/pages/signIn/SignIn";
import AddReview from "@/pages/addReview/addReview";
import Favorites from '@/pages/favorities/FavoritesUi';
import NotificationsUi from '@/components/notifications/NotificationsUi';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { authorizationStore } = useStore()

    return (
        <Route
            {...rest}
            render={props => (
                authorizationStore.isAuthorizationRequired ? <Redirect to="/login" /> : <Component {...props} />
            )}
        />
    )
}


const App = observer(() => {

    const { filmsStore } = useStore();

    useEffect(() => {
        filmsStore.getFilms();
    }, [])

    return(
        <Router>
            <NotificationsUi />
            <Switch>
                <Route exact path="/" component={MainPageUi} />
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/films/:id" component={MoviePageUi} />
                <PrivateRoute exact path="/favorite" component={Favorites} />
                <PrivateRoute exact path="/films/:id/review" component={AddReview} />
            </Switch>
        </Router>
    )
})

export default App;
