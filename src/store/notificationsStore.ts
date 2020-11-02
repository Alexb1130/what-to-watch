import { action, observable, computed } from 'mobx';

// @ts-ignore
import RootStore from '@/store';

interface Notification {
    id?: number,
    message: string,
    type: string
}

class NotificationsStore {

    private readonly rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable notifications: Map<number, Notification> = new Map()

    _defaultNotificationID: number = 0;

    @computed get list() {
        return [...this.notifications.values()];
    }

    @action add({message, type = 'error'}: Notification, timeToAutoHide: number = 3000) {
        this.notifications.set(++this._defaultNotificationID, {
            id: this._defaultNotificationID,
            message,
            type
        })

        if (timeToAutoHide !== null) {
            const currentMessageID = this._defaultNotificationID;

            setTimeout(() => this.remove(currentMessageID), timeToAutoHide)
        }
    }

    @action remove(id: number) {
        if (this.notifications.has(id)) {
            this.notifications.delete(id)
        }
    }

}

export default NotificationsStore;
