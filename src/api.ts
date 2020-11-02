import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';

enum Error {
    UNAUTHORIZED = 401
}

export const createAPI = (onUnauthorized: (err: any) => void) => {
    const api: AxiosInstance = axios.create({
        baseURL: `https://5.react.pages.academy/wtw/`,
        timeout: 5000,
        withCredentials: true
    });

    const onSuccess = (response: AxiosResponse) => {
        return response;
    };

    const onFail = (err: AxiosError): Promise<AxiosResponse> => {
        const { response } = err;

        if (response.status === Error.UNAUTHORIZED) {

            onUnauthorized(response.data.error);

            throw err;
        }

        throw err;
    };

    api.interceptors.response.use(onSuccess, onFail);

    return api;
};
