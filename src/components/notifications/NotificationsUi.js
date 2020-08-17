import React from "react";
import { observer } from "mobx-react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useStore } from "../../store";
import styles from './notifications.module.css';

const NotificationsUi = () => {

    const { notifications } = useStore();

    return (
        notifications.list.map(note => (
            <div className={styles.alert} key={note.id}>
                <div className={styles.message}>
                    <p>{note.message}</p>
                </div>
                <button type="button" onClick={() => notifications.remove(note.id)} className={styles.btn}>
                    <svg className={styles.icon} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M5.91617 5.00681L9.80998 1.11289C10.0634 0.859606 10.0634 0.450082 9.80998 0.196799C9.5567 -0.0564849 9.14717 -0.0564849 8.89389 0.196799L4.99996 4.09072L1.10615 0.196799C0.852743 -0.0564849 0.443336 -0.0564849 0.190052 0.196799C-0.0633507 0.450082 -0.0633507 0.859606 0.190052 1.11289L4.08386 5.00681L0.190052 8.90073C-0.0633507 9.15402 -0.0633507 9.56354 0.190052 9.81682C0.316279 9.94317 0.482248 10.0066 0.648099 10.0066C0.813949 10.0066 0.9798 9.94317 1.10615 9.81682L4.99996 5.9229L8.89389 9.81682C9.02023 9.94317 9.18608 10.0066 9.35193 10.0066C9.51778 10.0066 9.68363 9.94317 9.80998 9.81682C10.0634 9.56354 10.0634 9.15402 9.80998 8.90073L5.91617 5.00681Z" fill={'saddlebrown'} />
                        </g>
                    </svg>
                </button>
            </div>
        ))
    )
}

export default observer(NotificationsUi);
