import React from 'react';
import CatalogUi from '../catalog/CatalogUi';
import FooterUi from '../footer/FooterUi';
import MovieCardUi from "../movieCards/MovieCardUi";

const MainPageUi = () => {
    return (
        <>
            <MovieCardUi />
            <div className="page-content">
                <CatalogUi />
                <FooterUi />
            </div>
        </>
    )
};

export default MainPageUi;
