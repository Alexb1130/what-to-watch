import React from "react";

import FilmsStore from './filmsStore';
import AuthorizationStore from './authorizationStore';
import UserStore from './userStore';
import { createAPI } from '../api';
class RootStore {

    constructor() {
        this.api = createAPI();
        this.authorization = new AuthorizationStore(this);
        this.films = new FilmsStore(this);
        this.user = new UserStore(this);
    }

}

export default RootStore;

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children, store }) => {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

/* Hook to use store in any functional component */
export const useStore = () => React.useContext(StoreContext);

/* HOC to inject store to any functional or class component */
export const withStore = (Component) => (props) => {
    return <Component {...props} store={useStore()} />
};