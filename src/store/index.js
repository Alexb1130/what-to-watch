import FilmsStore from './filmsStore';
import AuthorizationStore from './authorizationStore';
import { createAPI } from '../api';
class RootStore {

    constructor() {
        this.api = createAPI();
        this.authorizationStore = new AuthorizationStore(this);
        this.filmsStore = new FilmsStore(this);
    }

}

export default new RootStore();