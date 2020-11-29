import request from '../request';
import { logout, login, forgotPassword, resetPassword, register } from './config';

const api = {
    register(body:any) {
        return request
            .post(register, body)
            .then((res) => res.data)
            .catch((error) => {
                throw error;
            });
    },
    login(body:any) {
        return request
            .post(login, body)
            .then((res) => res.data)
            .catch((error) => {
                throw error;
            });
    },
    logout() {
        return request
            .get(logout)
            .then((res) => res.data)
            .catch((error) => {
                throw error;
            });
    },
    forgotPassword(body:any) {
        return request
            .post(forgotPassword, body)
            .then((res) => res.data)
            .catch((error) => {
                console.log('error', error);
                throw error;
            });
    },
    resetPassword(body:any) {
        return request
            .post(resetPassword, body)
            .then((res) => res.data)
            .catch((error) => {
                throw error;
            });
    }
};

export default api;
