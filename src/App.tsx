import React, {useEffect} from 'react';
import {Switch, Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import { observer } from "mobx-react";
// @ts-ignore
import { useStore } from '@/store';
// @ts-ignore
import MainPageUi from '@/pages/main/MainPageUi';
// @ts-ignore
import MoviePageUi from '@/pages/movie/MoviePageUi';
// @ts-ignore
import SignIn from "@/pages/signIn/SignIn";
// @ts-ignore
import AddReview from "@/pages/addReview/addReview";
// @ts-ignore
import Favorites from '@/pages/favorities/FavoritesUi';
// @ts-ignore
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
