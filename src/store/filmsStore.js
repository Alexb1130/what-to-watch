import { observable, action } from 'mobx';
import {DEFAULT_GENRE} from '../common/constants';

export default class {

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
    }

    @observable films = [];
    @observable filmsCopy = [];
    @observable filmsAll = [];
    @observable filteredFilms = [];
    @observable isNoFilmsSelectedGenre = false;
    @observable currentFilm = null;

    @action getFilms() {
        return this.api.get('films').then(({data}) => {
            this.films = data;
            this.filmsCopy = [...data.slice(0, 8)];
            this.filmsAll = [...data];
            this.filmsAll.splice(0, 8);
        });
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
