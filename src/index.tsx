import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RootStore, { StoreProvider } from './store';

const rootStore = new RootStore();

ReactDOM.render(
    <StoreProvider store={rootStore}>
        <App />
    </StoreProvider>,
    document.querySelector('#root')
);
