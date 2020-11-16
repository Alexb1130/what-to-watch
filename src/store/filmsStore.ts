import { observable, computed, action } from 'mobx';
import RootStore from '@/store';
import {AxiosInstance} from "axios";
import {DEFAULT_GENRE, FILMS_ROW_COUNT} from '@/constants';
import {Movie, Comment} from '@/types';

export default class {

    private readonly rootStore: RootStore;
    private api: AxiosInstance;

    @observable films: Array<Movie> = [];
    @observable comments: Array<Comment> = [];
    @observable promoFilm: Movie | null = null;
    @observable currentFilm: Movie = null;
    @observable currentFilmsRowCount: number = FILMS_ROW_COUNT;
    @observable selectedGenre = DEFAULT_GENRE;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
    }

    @computed get currentFilms() {
        if(this.selectedGenre !== DEFAULT_GENRE) {
            return this.films.filter(film => film.genre === this.selectedGenre);
        }

        return [...this.films]
    }

    getSimilarFilms = (currentFilm: Movie) => {
        return this.films.filter((film) => film.genre === currentFilm.genre);
    }

    updateFilmsCount(newCount: number) {
        this.currentFilmsRowCount = newCount;
    }

    getCurrentFilm(films, id) {
        return films.find(film => film.id.toString() === id);
    }

    changeSelectedGenre(genre) {
        this.selectedGenre = genre;
    }

    @action async getFilms() {
        this.films = (await this.api.get('films')).data;
    }

    @action async getComments(id: string) {
        this.comments = (await this.api.get(`/comments/${id}`)).data;
    }

    @action async getPromoFilm() {
        this.promoFilm = (await this.api.get('films/promo')).data;
    }

    @action submitReview(id, reviewData) {
        return this.api.post(`/comments/${id}`, reviewData);
    }
}
