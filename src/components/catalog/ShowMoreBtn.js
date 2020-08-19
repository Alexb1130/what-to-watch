import React, {Component} from "react";
import {observer} from "mobx-react";
import {withStore} from '@/store';

@withStore
@observer
class ShowMoreBtn extends Component {

    filmsStore = this.props.store.films;

    clickHandler() {
        this.filmsStore.updateFilms()
    }

    renderBtn() {

        const filmsStore = this.filmsStore;

        if (filmsStore.isNoFilmsSelectedGenre) {
            return null;
        }

        if (filmsStore.filmsAll.length) {
            return <button onClick={() => this.clickHandler()} className="catalog__button" type="button">Show more</button>;
        }

        return null;
    }

    render() {
        return(
            <div className="catalog__more">
                {
                    this.renderBtn()
                }
            </div>
        )
    }
}

export default ShowMoreBtn;
