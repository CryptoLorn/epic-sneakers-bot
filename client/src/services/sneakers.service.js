import {axiosService, axiosAppService} from './axios.service';
import {urls} from '../configs/urls';

export const sneakersService = {
    getAll: (typeId, brandId, page) => axiosService
        .get(urls.sneakers, {params: {typeId, brandId, page}})
        .then(value => value.data),
    sendOrders: (data) => axiosAppService.post(urls.orders, data)
};