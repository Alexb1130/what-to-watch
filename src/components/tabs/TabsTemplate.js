import React from 'react';
import Tabs from './Tabs';
import TabOverview from './TabOverview';
import TabDetails from './TabDetails';
import TabReviews from './TabReviews';

class TabTemplate extends React.Component {

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

    tabClickHandler(event, { name }) {
        event.preventDefault();
        this.setState({
            currentTab: name
        })
    }

    render() {

        const { film } = this.props;
        const { tabs, currentTab } = this.state;

        return (
            <div className="movie-card__desc">
                <Tabs film={film} tabs={tabs} currentTab={currentTab} clickHandler={this.tabClickHandler.bind(this)} />
                {
                    currentTab === 'Overview' && <TabOverview film={film} />
                    || currentTab === 'Details' && <TabDetails film={film} />
                    || currentTab === 'Reviews' && <TabReviews film={film} />
                }
            </div>
        )
    }
}

export default TabTemplate;
