const mongoose = require('mongoose')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const routeDir = require('../app')

// Configure chai
chai.use(chaiHttp);
chai.should();


describe("All Operations on Trip", () => {

    beforeAll(async () => {
        mongoose.Promise = global.Promise
        await mongoose.connect(
            `mongodb+srv://fortunecode:fortunecode@safeboda-e9haz.mongodb.net/test?retryWrites=true`, {
                useNewUrlParser: true
            }
        );
    });

    afterAll(async () => {
        mongoose.Promise = global.Promise
        await mongoose.connection.close();
    });

    // Test to create Trip
    it("should create trip ", async (done) => {
        const res = await chai.request(routeDir)
            .post('/api/v1.0/trip/')
            .send({
                "userId": "5cd525c07a04281d62d2f65b",
                "pickup_location": "James Town Lighthouse, Cleland Road, Accra",
                "dropoff_location": "meltwater incubator",
                "promo_code": "EEQpiu"
            })
            .set('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvZHNkZmZkYXNkZUBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Y2Q4YWU2N2JlZGEwMjJiMzdiMTUxMjUiLCJpYXQiOjE1NTc3MDQyOTUsImV4cCI6MTU1NzcxNTA5NX0.Szgu2MKofJzq41BBZ-9niE_KwtTkOBkuXSjbsL5HOp8')
        expect(res).to.have.status(201).to.be.a('object')
        done()
    });
});