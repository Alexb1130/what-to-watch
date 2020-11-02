import {observable, action} from 'mobx';
// @ts-ignore
import RootStore from '@/store';
import {AxiosInstance} from "axios";

export default class {
    private readonly rootStore: RootStore;
    private api: AxiosInstance;
    @observable isAuthorizationRequired: boolean = true;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.api = this.rootStore.api;
    }

    @action async authorization(data) {
        this.isAuthorizationRequired = true;
        await this.api.post('login', data)
        this.isAuthorizationRequired = false;
    }
    @action async checkAuthorization() {
        this.isAuthorizationRequired = true;
        const response = await this.api.get('login')
        this.isAuthorizationRequired = false;

        return response.data;
    }
}
