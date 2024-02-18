const { BaseController } = require('./BaseController');


class CarsController extends BaseController {
    constructor() {
        super();
        this.API_CARS_MODELS = '/cars/models';
        this.API_CARS = '/cars';
    }

    getAllExistModels() {
        return this.get(this.API_CARS_MODELS);
    }

    async createCar(car) {
        return this.post(this.API_CARS, car);
    }

}

module.exports.CarsController = CarsController;