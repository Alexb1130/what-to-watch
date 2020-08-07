import React from "react";

import FilmsStore from './filmsStore';
import AuthorizationStore from './authorizationStore';
import UserStore from './userStore';
import NotificationsStore from './notificationsStore';
import { createAPI } from '../api';

class RootStore {

    constructor() {
        this.api = createAPI(errorMessage => this.notifications.add(errorMessage));
        this.authorization = new AuthorizationStore(this);
        this.films = new FilmsStore(this);
        this.user = new UserStore(this);
        this.notifications = new NotificationsStore(this);
    }

}

export default RootStore;

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children, store }) => {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

export const useStore = () => React.useContext(StoreContext);

export const withStore = (Component) => (props) => {
    return <Component {...props} store={useStore()} />
};