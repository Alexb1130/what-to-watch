import React from 'react';
import CatalogUi from '@/components/catalog/CatalogUi';
import FooterUi from '@/components/footer/FooterUi';
import MovieCardBigUi from "@/components/movieCards/MovieCardBigUi";

import {withStore} from '@/store';
import {observer} from 'mobx-react';

@withStore
@observer
class MainPageUi extends React.Component {

    filmsStore = this.props.store.films;
    userStore = this.props.store.user;

    favoriteHandler = id => {
        this.userStore.checkFavorite(id).then(index => {
            if (index !== -1) {
                this.userStore.removeFavorite(id).then(({ data }) => {
                    this.filmsStore.getPromoFilm()
                })
            } else {
                this.userStore.addFavorite(id).then(({ data }) => {
                    this.filmsStore.getPromoFilm()
                })
            }
        })
    }

    componentDidMount() {
        this.filmsStore.getPromoFilm()
    }

    render() {

        const {currentPromoFilm} = this.filmsStore;

        return (
            <>
                <MovieCardBigUi
                    film={currentPromoFilm}
                    favoriteHandler={this.favoriteHandler}
                />
                <div className="page-content">
                    <CatalogUi />
                    <FooterUi />
                </div>
            </>
        )
    }
};

export default MainPageUi;
