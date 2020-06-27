import React from 'react';
import {Link} from 'react-router-dom';

const UserBlock = ({user}) => (
    <div className="user-block">
        {
            user ?
                <div className="user-block__avatar">
                    <img src={`https://htmlacademy-react-3.appspot.com${user.avatar_url}`} alt={user.name} width="63" height="63" />
                </div> :
            <Link to="/login" className="user-block__link">Sign in</Link>
        }
    </div>
)

export default UserBlock;
