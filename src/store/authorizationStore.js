import {observable, action} from 'mobx';
export default class {

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
    }

    @observable isAuthorizationRequired = true;

    @action authorization(data) {
        return this.api.post('login', data)
            .then(({data}) => {
                this.isAuthorizationRequired = false
            })
    }
    @action checkAuthorization() {
        return this.api.get('login')
            .then(({data}) => {
                this.isAuthorizationRequired = false;
                return data;
            })
            .catch(e => {
                throw e
            })
    }
}
