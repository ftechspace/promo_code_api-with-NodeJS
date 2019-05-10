const mongoose = require('mongoose')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const routeDir = require('../app')

// Configure chai
chai.use(chaiHttp);
chai.should();


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
                "event_id": "5cd545222260ff5a58113258",
                "amount": "2.00",
                "event_radius": "14",
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

    // Test to deactivate promos
    it("should deactive promos ", (done) => {
        chai.request(routeDir)
            .put('/api/v1.0/promo/deactivate_promo/5cd525fa7a04281d62d2f65e')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            });
    });

    // Test to change promo radius
    it("should change promo radius ", (done) => {
        chai.request(routeDir)
            .put('/api/v1.0/promo/update_promo_radius/5cd525fa7a04281d62d2f65e')
            .send({
                "radius": "1",
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            });
    });

    // Test to validate promo code
    it("should est the validity of the promo code", (done) => {
        chai.request(routeDir)
            .post('/api/v1.0/promo/validate_promo')
            .send({
                "code": "TXWKhi",
                "origin": "Madina Zongo, Madina",
                "destination": "University of Ghana, Legon, Legon Boundary, Accra"
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            });
    });
});