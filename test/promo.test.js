const mongoose = require('mongoose')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const routeDir = require('../app')

// Configure chai
chai.use(chaiHttp);
chai.should();


describe("All Operations on Promo", () => {

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

    // Test to create promo succesfully
    it("should create promo succesfully", async (done) => {
        const res = await chai.request(routeDir)
            .post('/api/v1.0/promo/')
            .send({
                "event_id": "5cd545222260ff5a58113258",
                "amount": "2.00",
                "event_radius": "14",
                "expiry_date": "2019-05-30"
            })
        expect(res).to.have.status(201).to.be.a('object')
        done()
    });

    // Test to get all promos
    it("should get all promos ", async (done) => {
        const res = await chai.request(routeDir)
            .get('/api/v1.0/promo/')
        expect(res).to.have.status(200)
        done()
    })

    // Test to get all active promos
    it("should get all active promos ", async (done) => {
        const res = await chai.request(routeDir)
            .get('/api/v1.0/promo/active_promos')
        expect(res).to.have.status(200).to.be.a('object')
        done()
    });

    // Test to deactivate promos
    it("should deactive promos ", async (done) => {
        const res = await chai.request(routeDir)
            .put('/api/v1.0/promo/deactivate_promo/5cd525fa7a04281d62d2f65e')
        expect(res).to.have.status(200).to.be.a('object')
        done()
    });

    // Test to change promo radius
    it("should change promo radius ", async (done) => {
        const res = await chai.request(routeDir)
            .put('/api/v1.0/promo/update_promo_radius/5cd525fa7a04281d62d2f65e')
            .send({
                "radius": "1",
            })
        expect(res).to.have.status(200)
        done()
    });

    // Test to validate promo code
    it("should test the validity of the promo code", async (done) => {
        const res = await chai.request(routeDir)
            .post('/api/v1.0/promo/validate_promo')
            .send({
                "code": "TXWKhi",
                "origin": "Madina Zongo, Madina",
                "destination": "University of Ghana, Legon, Legon Boundary, Accra"
            })
            expect(res).to.have.status(200)
            done()
    });

    // Test to create event
    it("should create event ", async (done) => {
        const res = await chai.request(routeDir)
            .post('/api/v1.0/event/')
            .send({
                "name": "Monthly GoLang Summit",
                "location": "meltwater incubator"
            })
        expect(res).to.have.status(201).to.be.a('object')
        done()
    });

    // Test to create trip
    it("should create trip ", async (done) => {
        const res = await chai.request(routeDir)
            .post('/api/v1.0/event/')
            .send({
                "name": "Monthly GoLang Summit",
                "location": "meltwater incubator"
            })
        expect(res).to.have.status(201).to.be.a('object')
        done()
    });
});