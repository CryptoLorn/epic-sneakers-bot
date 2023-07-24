import axios from 'axios';

import baseURL from '../configs/urls';

const axiosService = axios.create({withCredentials: true, baseURL});
const axiosAppService = axios.create({withCredentials: true, baseURL: '/api'});

export {axiosService, axiosAppService};