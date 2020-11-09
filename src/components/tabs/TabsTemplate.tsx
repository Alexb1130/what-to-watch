import React, {useState} from 'react';
import Tabs from './Tabs';
import TabOverview from './TabOverview';
import TabDetails from './TabDetails';
import TabReviews from './TabReviews';

type tabList = 'Overview' | 'Details' | 'Reviews';

const TAB_LIST: Array<tabList> = [ 'Overview', 'Details', 'Reviews']

const TabTemplate = (props) => {
    const [currentTab, setCurrentTab] = useState<string>(TAB_LIST[0])
    const {film} = props;

    const tabClickHandler = (event: React.MouseEvent<HTMLAnchorElement>, name: tabList) => {
        event.preventDefault();
        setCurrentTab(name)
    }

    return (
        <div className="movie-card__desc">
            <Tabs tabs={TAB_LIST} currentTab={currentTab} clickHandler={tabClickHandler} />
            {
                currentTab === 'Overview' && <TabOverview film={film} />
                || currentTab === 'Details' && <TabDetails film={film} />
                || currentTab === 'Reviews' && <TabReviews film={film} />
            }
        </div>
    )
}

export default TabTemplate;
