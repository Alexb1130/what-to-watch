import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {films} from './mocks/films';

ReactDOM.render(
    <App films={films} />,
    document.querySelector('#root')
);
