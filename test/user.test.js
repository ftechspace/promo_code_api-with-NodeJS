const mongoose = require('mongoose')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const routeDir = require('../app')

// Configure chai
chai.use(chaiHttp);
chai.should();


describe("All Operations on User", () => {

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

    // Test to create user
    it("should create user ", async (done) => {
        const res = await chai.request(routeDir)
            .post('/api/v1.0/user/')
            .send({
                "email": "ceosfgfdde@gmail.com",
                "password": "codecode"
            })
        expect(res).to.have.status(201).to.be.a('object')
        done()
    });
});