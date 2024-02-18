const axios = require('axios')
require('jest-expect-message')

test.skip('First api test', async () => {
    const resp = await axios.get('https://qauto.forstudy.space/api/cars/brands');
    console.log(resp.data.data);
    expect(resp.data.data.length, 'incorrect lenght').toBe(5);
})