import axios from "axios";

export default function callApi(method = 'GET', data, url) {
    url = 'https://61024f8727d22500174b2343.mockapi.io/' + url;
    return axios({
        method,
        url,
        data
    })
}