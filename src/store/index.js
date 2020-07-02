import FilmsStore from './filmsStore';
import AuthorizationStore from './authorizationStore';


class RootStore {

    constructor() {
        this.authorizationStore = new AuthorizationStore(this);
        this.filmsStore = new FilmsStore(this);
    }

}

export default new RootStore();