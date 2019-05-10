const mongoose = require('mongoose')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const routeDir = require('../app')

// Configure chai
chai.use(chaiHttp);
chai.should();

mongoose.Promise = global.Promise

describe("All Operations on Event Promo", () => {

    beforeAll(async () => {
        mongoose.Promise = global.Promise
        console.log(">>>>>>>>>>before all>>>>>>>>>>>")
        await mongoose.connect(
            `mongodb+srv://fortunecode:fortunecode@safeboda-e9haz.mongodb.net/test?retryWrites=true`, {
                useNewUrlParser: true
            }
        );
    });

    afterAll(async () => {
        mongoose.Promise = global.Promise
        console.log(">>>>>>>>>>after all>>>>>>>>>>>")
        await mongoose.connection.close();
    });



    // Test to create promo
    it("should create promo ", (done) => {
        chai.request(routeDir)
            .post('/api/v1.0/promo/')
            .send({
                "event_id": "5cd525cd7a04281d62d2f65d",
                "amount": "2.00",
                "event_radius": "78",
                "expiry_date": "2019-05-30"
            }).end((err, res) => {
                expect(res).to.have.status(201).to.be.a('object')
                done()
            });
    });

    // Test to get all promos
    it("should get all promos ", (done) => {
        chai.request(routeDir)
            .get('/api/v1.0/promo/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            });
    });

    // Test to get all active promos
    it("should get all active promos ", (done) => {
        chai.request(routeDir)
            .get('/api/v1.0/promo/active_promos')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            });
    });

});