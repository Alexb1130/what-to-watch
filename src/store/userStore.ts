import { observable, action } from 'mobx';
// @ts-ignore
import RootStore from '@/store';
import {AxiosInstance} from "axios";

// @ts-ignore
import {User, Movie} from '@/types';

export default class {
    private readonly rootStore: RootStore;
    private api: AxiosInstance;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
    }

    @observable user: User | null = null;

    @observable favorites: Array<Movie> = [];

    @action async getUser() {
        this.user = await this.rootStore.authorizationStore.checkAuthorization()
    }

    @action addFavorite(id, status = '1') {
        return this._actionFavorite(id, status)
    }

    @action removeFavorite(id, status = '0') {
        return this._actionFavorite(id, status)
    }

    @action async getFavorite() {
        this.favorites = (await this.api.get(`/favorite/`)).data;

        return this.favorites;
    }

    @action async checkFavorite(id) {
        const favorites = await this.getFavorite();
        return favorites.findIndex(movie => movie.id === id);
    }

    _actionFavorite(id, status) {
        return this.api.post(`/favorite/${id}/${status}`)
    }
}
