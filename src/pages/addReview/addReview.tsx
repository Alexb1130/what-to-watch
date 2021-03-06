import React  from 'react';
import {observer} from "mobx-react";
import { useParams, useHistory } from 'react-router-dom';
import {useStore} from '@/store';
import UserBlock from '@/components/userBlock/UserBlockUi';

const AddReview = observer(() => {

    const {filmsStore} = useStore();
    const history = useHistory();
    const { id: filmId } = useParams();

    const onSubmitReview = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const reviewData = {
            rating: parseInt(form.elements['rating'].value, 10),
            comment: form.elements['review-text'].value
        }

        await filmsStore.submitReview(filmId, reviewData);
        history.goBack();

    }

    const goBack = (event: React.SyntheticEvent) => {
        event.preventDefault();
        history.goBack();
    }

    const {films, getCurrentFilm} = filmsStore;
    const currentFilm = getCurrentFilm(films, filmId);

    if(!currentFilm) {
        return <h1>Loading...</h1>
    }

    return (
        <section className="movie-card movie-card--full" style={{backgroundColor: currentFilm.background_color}}>
            <div className="movie-card__header">
                <div className="movie-card__bg">
                    <img src={`${currentFilm.background_image}`} alt={`${currentFilm.name}`}/>
                </div>

                <h1 className="visually-hidden">WTW</h1>

                <header className="page-header">
                    <div className="logo">
                        <a href="/" className="logo__link">
                            <span className="logo__letter logo__letter--1">W</span>
                            <span className="logo__letter logo__letter--2">T</span>
                            <span className="logo__letter logo__letter--3">W</span>
                        </a>
                    </div>

                    <nav className="breadcrumbs">
                        <ul className="breadcrumbs__list">
                            <li className="breadcrumbs__item">
                                <a href="movie-page.html" onClick={goBack} className="breadcrumbs__link">{currentFilm.name}</a>
                            </li>
                            <li className="breadcrumbs__item">
                                <a className="breadcrumbs__link">Add review</a>
                            </li>
                        </ul>
                    </nav>

                    <UserBlock />

                </header>

                <div className="movie-card__poster movie-card__poster--small">
                    <img src={currentFilm.poster_image} alt={currentFilm.name}
                         width="218"
                         height="327"/>
                </div>
            </div>

            <div className="add-review">
                <form action="#" onSubmit={onSubmitReview} className="add-review__form">
                    <div className="rating">
                        <div className="rating__stars">
                            <input className="rating__input" id="star-1" type="radio" name="rating" defaultValue="1"/>
                            <label className="rating__label" htmlFor="star-1">Rating 1</label>

                            <input className="rating__input" id="star-2" type="radio" name="rating" defaultValue="2"/>
                            <label className="rating__label" htmlFor="star-2">Rating 2</label>

                            <input className="rating__input" id="star-3" type="radio" name="rating" defaultValue="3"
                                   defaultChecked/>
                            <label className="rating__label" htmlFor="star-3">Rating 3</label>

                            <input className="rating__input" id="star-4" type="radio" name="rating" defaultValue="4"/>
                            <label className="rating__label" htmlFor="star-4">Rating 4</label>

                            <input className="rating__input" id="star-5" type="radio" name="rating" defaultValue="5"/>
                            <label className="rating__label" htmlFor="star-5">Rating 5</label>
                        </div>
                    </div>

                    <div className="add-review__text">
                    <textarea defaultValue="" className="add-review__textarea" name="review-text" id="review-text"
                      placeholder="Review text" />
                        <div className="add-review__submit">
                            <button className="add-review__btn" type="submit">Post</button>
                        </div>

                    </div>
                </form>
            </div>

        </section>
    )
})

export default AddReview;
