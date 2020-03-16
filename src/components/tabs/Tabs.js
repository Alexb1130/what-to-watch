import React from 'react';
import PropTypes from 'prop-types';

class Tabs extends React.Component {

    render() {
        const { film, tabs, currentTab, clickHandler } = this.props;

        return (
            <nav className="movie-nav movie-card__nav">
                <ul className="movie-nav__list">
                    {tabs.map(tab => (
                        <li key={tab.id} className={`movie-nav__item ${currentTab === tab.name && 'movie-nav__item--active'}`}>
                            <a href="#" onClick={e => clickHandler(e, tab)} className="movie-nav__link">{tab.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}

Tabs.propTypes = {
    film: PropTypes.object,
    films: PropTypes.array,
    tabs: PropTypes.array,
    currentTab: PropTypes.string,
    clickHandler: PropTypes.func
};

export default Tabs;
