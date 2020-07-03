import FilmsStore from './filmsStore';
import AuthorizationStore from './authorizationStore';
import UserStore from './userStore';
import { createAPI } from '../api';
class RootStore {

    constructor() {
        this.api = createAPI();
        this.authorizationStore = new AuthorizationStore(this);
        this.filmsStore = new FilmsStore(this);
        this.userStore = new UserStore(this);
    }

}

export default new RootStore();