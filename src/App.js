import React from 'react';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import MainPageUi from './components/mainPage/MainPageUi';
import MoviePageUi from './components/moviePage/MoviePageUi';

const App = props => {
    const { films } = props;
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <MainPageUi films={films} />
                </Route>
                <Route exact path="/movie-page">
                    <MoviePageUi films={films} />
                </Route>
            </Switch>
        </Router>
    )
};

export default App;
