import { observable, action } from 'mobx';
import RootStore from '@/store';
import {AxiosInstance} from "axios";
import {User, Movie, FavoriteStatus} from '@/types';

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

    @action async updateFavorite(id) {
        const index = await this.checkFavorite(id);

        if (index !== -1) {
            await this.api.post(`/favorite/${id}/${FavoriteStatus.remove}`);
            return;
        }

        await this.api.post(`/favorite/${id}/${FavoriteStatus.add}`)
    }

    @action async getFavorite() {
        this.favorites = (await this.api.get(`/favorite/`)).data;

        return this.favorites;
    }

    @action async checkFavorite(id) {
        const favorites = await this.getFavorite();
        return favorites.findIndex(movie => movie.id === id);
    }
}
