import {axiosAppService} from './axios.service';
import {urls} from '../configs/urls';

export const userService = {
    sendUser: (user) => axiosAppService.post(urls.form, user)
};