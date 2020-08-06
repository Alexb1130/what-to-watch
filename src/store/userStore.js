import { observable, action, remove } from 'mobx';

export default class {

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
    }

    @observable user = null;

    @observable favorites = [];

    @action getUser() {
         return this.rootStore.authorization.checkAuthorization().then(data => {
            this.user = data;
        })
    }

    @action addFavorite(id, status = '1') {
        return this._actionFavorite(id, status)
    }

    @action removeFavorite(id, status = '0') {
        return this._actionFavorite(id, status)
    }

    @action getFavorite() {
        return this.api.get(`/favorite/`).then(res => {
            this.favorites = res.data;
        })
    }

    @action checkFavorite(id) {
        return this.api.get(`/favorite/`).then(({ data }) => data.findIndex(movie => movie.id === id))
    }

    _actionFavorite(id, status) {
        return this.api.post(`/favorite/${id}/${status}`).then(({ data }) => {
            this.rootStore.films.getFilms();
        })
    }
}