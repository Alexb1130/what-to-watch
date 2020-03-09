import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

const logoLetters = ['W', 'T', 'W'];

const logoLettersRender = logoLetters.map((letter, i) => (
    <span key={letter + i} className={`logo__letter logo__letter--${i + 1}`}>{letter}</span>
));

const Logo = withRouter((props) => {
    const {pathname} = props.location;

    return <div className="logo">
        {pathname === '/' ?
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
