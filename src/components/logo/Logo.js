import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const logoLetters = ['W', 'T', 'W'];

const logoLettersRender = logoLetters.map((letter, i) => (
    <span key={letter + i} className={`logo__letter logo__letter--${i + 1}`}>{letter}</span>
));

const Logo = props => {
    return <div className="logo">
        <Link to="/" className={`logo__link ${props.modifier || ''}`}>
            {logoLettersRender}
        </Link>
    </div>
};

Logo.propTypes = {
    modifier: PropTypes.string
};

export default Logo;
