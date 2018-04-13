import {hashHistory} from 'react-router';
export function login() {}
export function logout() {
    localStorage.removeItem('userInfo');
    hashHistory.replace('/login');
}