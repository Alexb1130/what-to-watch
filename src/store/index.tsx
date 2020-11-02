import React from "react";

import FilmsStore from './filmsStore';
import AuthorizationStore from './authorizationStore';
import UserStore from './userStore';
import NotificationsStore from './notificationsStore';
import { createAPI } from '@/api';
import {AxiosInstance} from "axios";

class RootStore {
    api: AxiosInstance = createAPI(errorMessage => this.notificationsStore.add(errorMessage));
    authorizationStore = new AuthorizationStore(this);
    filmsStore = new FilmsStore(this);
    userStore = new UserStore(this);
    notificationsStore = new NotificationsStore(this);
}

export default RootStore;

const StoreContext = React.createContext<RootStore>({} as RootStore);

export const StoreProvider: React.FC<React.PropsWithChildren<{store: RootStore}>> = ({
     children,
     store,
 }) => <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;

export const useStore = () => React.useContext(StoreContext);

export const withStore = (Component) => (props) => {
    return <Component {...props} store={useStore()} />
};
