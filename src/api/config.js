import axios from 'axios'

const baseURL = (process.env.NODE_ENV !== 'production') ? 
    'http://localhost:8000/' 
    : 
    'https://app-eve.herokuapp.com/';

export const setAuthHeader = (instance, token) => 
    instance.defaults.headers.common['Authorization'] = `Token ${token}`;

export const removeAuthHeader = instance => 
    delete instance.defaults.headers.common["Authorization"];

export default axios.create({
    baseURL: baseURL
});