import { observable, computed, action } from 'mobx';
// @ts-ignore
import RootStore from '@/store';
import {AxiosInstance} from "axios";
// @ts-ignore
import {DEFAULT_GENRE} from '@/common/constants';
// @ts-ignore
import {Movie} from '@/types';

export default class {

    private readonly rootStore: RootStore;
    private api: AxiosInstance;

    @observable films: Array<Movie> = [];
    @observable promoFilm: Movie | null = null;
    @observable filmsCopy: Array<Movie> = [];
    @observable filmsAll: Array<Movie> = [];
    @observable filteredFilms: Array<Movie> = [];
    @observable isNoFilmsSelectedGenre: boolean = false;
    @observable currentFilm: Movie = null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
    }

    @action async getFilms() {
        const films = (await this.api.get('films')).data;
        this.films = films;
        this.filmsCopy = [...films.slice(0, 8)];
        this.filmsAll = [...films];
        this.filmsAll.splice(0, 8);
    }

    @computed get currentPromoFilm() {
        return this.promoFilm || {}
    }

    @action async getPromoFilm() {
        this.promoFilm = (await this.api.get('films/promo')).data;
    }

    @action submitReview(id, reviewData) {
        return this.api.post(`/comments/${id}`, reviewData);
    }

    updateFilms() {
        this.filmsCopy = [...this.filmsCopy, ...this.filmsAll.splice(0, 4)];
    }

    getCurrentFilm(films, id) {
        return films.find(film => film.id.toString() === id);
    }

    filterByGenre(genre) {

        if (!this.filteredFilms.length && genre !== DEFAULT_GENRE) {
            this.isNoFilmsSelectedGenre = true;
        }

        if (genre === DEFAULT_GENRE) {
            this.isNoFilmsSelectedGenre = false;
            this.filteredFilms = [];
        }

        this.filteredFilms = this.films.filter(film => film.genre === genre);
    }
}
