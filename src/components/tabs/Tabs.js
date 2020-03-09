import React from 'react';

class Tabs extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
    }


    state = {
        currentTab: 'Overview',
        tabs: [
            {
                id: 'tab-overview',
                name: 'Overview'
            },
            {
                id: 'tab-details',
                name: 'Details'
            },
            {
                id: 'tab-reviews',
                name: 'Reviews'
            }
        ]
    };

    tabClickHandler(event, {name}) {
        event.preventDefault();
        this.setState({
            currentTab: name
        })
    }

    render() {
        return (
            <nav className="movie-nav movie-card__nav">
                <ul className="movie-nav__list">
                    {this.state.tabs.map(tab => (
                        <li key={tab.id} className={`movie-nav__item ${this.state.currentTab === tab.name && 'movie-nav__item--active'}`}>
                            <a href="#" onClick={e => this.tabClickHandler(e, tab)} className="movie-nav__link">{tab.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}

export default Tabs;
