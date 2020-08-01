import { observable, action } from 'mobx';

export default class {

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
    }

    @observable user = null;

    @observable favorites = [];

    @action getUser() {
         this.rootStore.authorizationStore.checkAuthorization().then(data => {
            this.user = data;
        })
    }

    @action addFavorite(id, status = '1') {
        this.api.post(`/favorite/${id}/${status}`)
    }

    @action removeFavorite(id, status = '0') {
        this.api.post(`/favorite/${id}/${status}`)
    }

    @action getFavorite() {
        this.api.get(`/favorite/`).then(res => {
            this.favorites = res.data;
        })
    }
}