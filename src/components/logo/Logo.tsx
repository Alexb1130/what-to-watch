import React from 'react';
import {Link} from 'react-router-dom';

const logoLetters = ['W', 'T', 'W'];

const logoLettersRender = logoLetters.map((letter, i) => (
    <span key={letter + i} className={`logo__letter logo__letter--${i + 1}`}>{letter}</span>
));

const Logo = (props: {modifier?: string}) => {
    return <div className="logo">
        <Link to="/" className={`logo__link ${props.modifier || ''}`}>
            {logoLettersRender}
        </Link>
    </div>
};

export default Logo;
