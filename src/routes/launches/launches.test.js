const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Test Launches API', () => {
    jest.setTimeout(20000);
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    })

    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get('/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test POST /launces', () => {
        const completeLaunchData = {
            mission: 'US',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'October 15, 2022'
        }

        const launchWithInvalidDate = {
            mission: 'US',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'Hello'
        }

        const launchWithoutDate = {
            mission: 'US',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f'
        }
        test('It should respond with 201 success', async () => {
            const response = await request(app)
                .post('/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);

            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();

            expect(responseDate).toBe(requestDate);

            expect(response.body).toMatchObject(launchWithoutDate)
        });

        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: "Missing required Launch property",
            })

        });

        test('It should catch invalid dates', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Invalid Date',
            })
        });
    })
});

