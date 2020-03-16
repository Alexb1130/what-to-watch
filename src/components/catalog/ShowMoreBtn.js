import React, {Component} from "react";
import {observer} from "mobx-react";
import filmsStore from '../../store/films';

@observer
class ShowMoreBtn extends Component {

    clickHandler() {
        filmsStore.updateFilms()
    }

    renderBtn() {

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
