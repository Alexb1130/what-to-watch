import { action, observable, computed } from 'mobx';

class NotificationsStore {
    
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable notifications = new Map()

    _defaultNotificationID = 0;

    @computed get notificationsList() {
        return [...this.notifications.values()];
    }

    @action add(message, type = 'error', timeToAutoHide = 3000) {
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

    @action remove(id) {
        if (this.notifications.has(id)) {
            this.notifications.delete(id)
        }
    }

}

export default NotificationsStore;