import {observable, action} from 'mobx';
import {createAPI} from '../api';

const api = createAPI();

class AuthorizationStore {
    @observable isAuthorizationRequired = true;

    @action authorization(data) {
        return api.post('login', data)
            .then(({data}) => {
                this.isAuthorizationRequired = false
            })
    }
    @action checkAuthorization() {
        return api.get('login')
            .then(({data}) => {
                this.isAuthorizationRequired = false;
                return data;
            })
            .catch(e => {
                throw e
            })
    }
}

export default new AuthorizationStore();
