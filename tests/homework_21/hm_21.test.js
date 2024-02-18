const { CarsController } = require('../../src/controllers/CarsController');


const carsController = new CarsController();
describe('HomeWork_21', () => {
	beforeAll(async () => {
		await carsController.login();
	});

	test('creating all avaible mark and models', async () => {
		const models = await carsController.getAllExistModels();
		const allBrandsAndModels = models.data.data.map(({ id, carBrandId }) => ({
			carBrandId: carBrandId,
			carModelId: id,
			mileage: 222
		}));
		for (let obj of allBrandsAndModels) {
			const resp = await carsController.createCar(obj);
			expect(resp.status).toBe(201);
			expect(resp.data.data).toMatchObject(obj);
		}
	});

	test('creating car with incorrect mark', async () => {
		const carReqWithIncorectBrandId = {
			"carBrandId": 100,
			"carModelId": 1,
			"mileage": 122
		};
		const resp = await carsController.createCar(carReqWithIncorectBrandId);
		expect(resp.status).toBe(404);
	});

	test('creating car with incorrect model', async () => {
		const carReqWithIncorectModelId = {
			"carBrandId": 1,
			"carModelId": 100,
			"mileage": 122
		};
		const resp = await carsController.createCar(carReqWithIncorectModelId);
		expect(resp.status).toBe(404);
	});

	test('creating car with negative mileage', async () => {
		const carReqWithNegativeMillage = {
			"carBrandId": 1,
			"carModelId": 1,
			"mileage": -1
		};
		const resp = await carsController.createCar(carReqWithNegativeMillage);
		expect(resp.status).toBe(400);
	});

	test('creating car with greater than maximum value millage', async () => {
		const carReqWithMoreThanMaxiimumValueMillage = {
			"carBrandId": 1,
			"carModelId": 1,
			"mileage": 10000000
		};
		const resp = await carsController.createCar(carReqWithMoreThanMaxiimumValueMillage);
		expect(resp.status).toBe(400);
	});

	test('creating car without millage value', async () => {
		const carReqWithOutMillageValue = {
			"carBrandId": 1,
			"carModelId": 1,
		};
		const resp = await carsController.createCar(carReqWithOutMillageValue);
		expect(resp.status).toBe(400);
	});
});