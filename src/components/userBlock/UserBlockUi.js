import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { observer } from "mobx-react";
import {useStore} from '@/store';

const UserBlock = () => {

    const {userStore} = useStore();
    const {user} = userStore;

    useEffect(() => {
        userStore.getUser();
    }, [])

    return(
        <div className="user-block">
            {
                user ?
                    <Link style={{ display: 'block' }} to="/favorite" className="user-block__avatar">
                        <img src={`${user.avatar_url}`} alt={user.name} width="63" height="63" />
                    </Link> :
                    <Link to="/login" className="user-block__link">Sign in</Link>
            }
        </div>
    )
}

export default observer(UserBlock);
