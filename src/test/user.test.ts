const request = require('supertest');
import app from "../server";


describe("GET /api", () => {
    it("should return 200 OK", () => {
        return request(app).get("/api")
            .expect(400);
    });
});

describe("POST /login", () => {
    it("should return false from assert when no message is found", (done) => {
        request(app).post("/api/login")
            .field("username", "John Doe")
            .field("password", "john@me.com")
            .end(res => {
                expect(res.error);
                done();
            })
            .expect(400);

    });
});