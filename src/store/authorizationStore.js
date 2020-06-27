import {observable, action} from 'mobx';
import {createAPI} from '../api';

const api = createAPI();

export default class {
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
