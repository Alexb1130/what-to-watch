import { observable, action } from 'mobx';
import {createAPI} from '../api';

const api = createAPI();


class AuthorizationStore {
    @observable isAuthorizationRequired = true;
    @observable authToken = '';
    @observable users = [];

    @action authorization(data) {
        return api.post('login', data)
            .then(({data}) => {
                this.users.push(data);
                this.isAuthorizationRequired = false
            })
    }
    @action checkAuthorization() {
        return api.get('login')
            .then(() => this.isAuthorizationRequired = false)
            .catch(e => {
                throw e
            })
    }
}

export default new AuthorizationStore();
