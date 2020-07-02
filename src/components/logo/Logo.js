import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import rootStore from '../../store';

const logoLetters = ['W', 'T', 'W'];

const logoLettersRender = logoLetters.map((letter, i) => (
    <span key={letter + i} className={`logo__letter logo__letter--${i + 1}`}>{letter}</span>
));

const Logo = withRouter((props) => {
    const {pathname} = props.location;
    const {authorizationStore} = rootStore;

    return <div className="logo">
        {pathname === '/' || authorizationStore.isAuthorizationRequired ?
            <a className={`logo__link ${props.modifier || ''}`}>
                {logoLettersRender}
            </a> :
            <Link to="/" className={`logo__link ${props.modifier || ''}`}>
                {logoLettersRender}
            </Link>
        }
    </div>
});

Logo.propTypes = {
    modifier: PropTypes.string
};

export default Logo;
