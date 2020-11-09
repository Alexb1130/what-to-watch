import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import moment from 'moment';
import {observer} from "mobx-react";
import {useStore} from "@/store";
import {Comment} from "@/types";

const TabReviews = withRouter(observer((props: RouteComponentProps) => {
    const {filmsStore} = useStore();
    const {comments} = filmsStore;
    const {id} = props.match.params;

    useEffect(() => {
        filmsStore.getComments(id)
    }, [comments])

    const renderCol = (comments: Array<Comment>): Array<JSX.Element> => {
        return comments.map((commentItem: Comment) => (
            <div className="review" key={commentItem.id}>
                <blockquote className="review__quote">
                    <p className="review__text">{commentItem.comment}</p>

                    <footer className="review__details">
                        <cite className="review__author">{commentItem.user.name}</cite>
                        <time className="review__date" dateTime="2016-12-24">
                            {moment(commentItem.date).format('MMMM D, YYYY')}
                        </time>
                    </footer>
                </blockquote>
                <div className="review__rating">{commentItem.rating}</div>
            </div>
        ))
    }


    const reviewsLeftCol = comments.filter((_, i) => i % 2 === 0);
    const reviewsRightCol = comments.filter((_, i) => i % 2 !== 0);

    return (
        <div className="movie-card__reviews movie-card__row">
            <div className="movie-card__reviews-col">
                {renderCol(reviewsLeftCol)}
            </div>
            <div className="movie-card__reviews-col">
                {renderCol(reviewsRightCol)}
            </div>
        </div>
    )
}))

export default TabReviews;
