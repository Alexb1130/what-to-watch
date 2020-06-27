import React from 'react';
import {createAPI} from '../../api';
import {withRouter} from 'react-router-dom';
import moment from 'moment';

const api = createAPI();

@withRouter
class TabReviews extends React.Component {

    state = {
        rewiews: []
    }

    componentDidMount() {
        api.get(`/comments/${this.props.match.params.id}`)
            .then(({data}) => {
                console.log(data)
                this.setState({rewiews: data})
            })
    }

    rewiewRender(rewiews) {
        return rewiews.map(rewiew => (
            <div className="review" key={rewiew.id}>
                <blockquote className="review__quote">
                    <p className="review__text">{rewiew.comment}</p>

                    <footer className="review__details">
                        <cite className="review__author">{rewiew.user.name}</cite>
                        <time className="review__date" dateTime="2016-12-24">
                            {moment(rewiew.date).format('MMMM D, YYYY')}
                        </time>
                    </footer>
                </blockquote>
                <div className="review__rating">{rewiew.rating}</div>
            </div>
        ))
    }

    render() {
        const {rewiews} = this.state;
        const rewiewsCopy = [...this.state.rewiews];

        const rewiewsLeftCol = rewiewsCopy.slice(0, this.state.rewiews.length / 2);
        const rewiewsRightCol = rewiewsCopy.slice(this.state.rewiews.length / 2);

        return (
            <div className="movie-card__reviews movie-card__row">
                {
                    this.state.rewiews.length === 1 ?

                    <div className="movie-card__reviews-col">
                        {this.rewiewRender(rewiews)}
                    </div> :
                    <>
                        <div className="movie-card__reviews-col">
                            {this.rewiewRender(rewiewsLeftCol)}
                        </div>
                        <div className="movie-card__reviews-col">
                            {this.rewiewRender(rewiewsRightCol)}
                        </div>
                    </>
                }
            </div>
        )
    }
}

export default TabReviews;
