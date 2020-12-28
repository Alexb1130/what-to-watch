import React from 'react';
import { TabList } from '@/types';

interface Props {
    tabs: TabList[],
    currentTab: string,
    clickHandler: (e: React.MouseEvent, tab: string) => void
}

const Tabs = (props: Props) => {

    const {tabs, currentTab, clickHandler} = props;

    return (
        <nav className="movie-nav movie-card__nav">
            <ul className="movie-nav__list">
                {tabs.map(tab => (
                    <li key={tab}
                        className={`movie-nav__item ${currentTab === tab && 'movie-nav__item--active'}`}>
                        <a href="#" onClick={e => clickHandler(e, tab)} className="movie-nav__link">{tab}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Tabs;
