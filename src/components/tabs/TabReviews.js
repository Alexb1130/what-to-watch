import React from 'react';
import {createAPI} from '@/api';
import {withRouter} from 'react-router-dom';
import moment from 'moment';

const api = createAPI();

@withRouter
class TabReviews extends React.Component {

    state = {
        reviews: []
    }

    componentDidMount() {
        api.get(`/comments/${this.props.match.params.id}`)
            .then(({data}) => this.setState({reviews: data}))
    }

    reviewRender(reviews) {
        return reviews.map(review => (
            <div className="review" key={review.id}>
                <blockquote className="review__quote">
                    <p className="review__text">{review.comment}</p>

                    <footer className="review__details">
                        <cite className="review__author">{review.user.name}</cite>
                        <time className="review__date" dateTime="2016-12-24">
                            {moment(review.date).format('MMMM D, YYYY')}
                        </time>
                    </footer>
                </blockquote>
                <div className="review__rating">{review.rating}</div>
            </div>
        ))
    }

    render() {
        const {reviews} = this.state;

        const reviewsLeftCol = reviews.filter((_, i) => i % 2 === 0 );
        const reviewsRightCol = reviews.filter((_, i) => i % 2 !== 0 );

        return (
            <div className="movie-card__reviews movie-card__row">
                <div className="movie-card__reviews-col">
                    {this.reviewRender(reviewsLeftCol)}
                </div>
                <div className="movie-card__reviews-col">
                    {this.reviewRender(reviewsRightCol)}
                </div>
            </div>
        )
    }
}

export default TabReviews;
