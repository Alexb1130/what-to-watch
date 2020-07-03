import { observable, action } from 'mobx';

export default class {

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
    }

    @observable user = null;

    @action getUser() {
        this.rootStore.authorizationStore.checkAuthorization().then(data => {
            this.user = data;
        })
    }
}