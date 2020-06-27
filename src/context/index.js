import React from 'react';
import AuthorizationStore from '../store/authorizationStore';
import FilmsStore from '../store/filmsStore';

export const rootStoreContent = React.createContext({
    authorizationStore: new AuthorizationStore(),
    filmsStore: new FilmsStore()
})
