const axios = require('axios');

class BaseController {
    constructor() {
        this.options = {
            baseURL: process.env.BASE_URL,
            validateStatus: (status) => {
                return true;
            }
        }
        this.client = axios.create(this.options);
        this.API_SIGN_IN_USER = '/auth/signin';
    }

    async login() {
        const authResp = await axios.post(`${process.env.BASE_URL + this.API_SIGN_IN_USER}`, {
            email: process.env.MAIL,
            password: process.env.PASSWORD,
            remember: false,
        });
        const sid = authResp.headers['set-cookie'][0].split(';')[0];
        this.options.headers = { Cookie: sid };
    }


    get(url) {
        return this.client.get(url, this.options);
    }

    post(url, data) {
        return this.client.post(url, data, this.options);
    }

}

module.exports.BaseController = BaseController;