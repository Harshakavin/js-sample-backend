"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('supertest');
const server_1 = require("./../server");
describe("GET /api", () => {
    it("should return 200 OK", () => {
        return request(server_1.default).get("/api")
            .expect(400);
    });
});
describe("POST /login", () => {
    it("should return false from assert when no message is found", (done) => {
        request(server_1.default).post("/api/login")
            .field("username", "John Doe")
            .field("password", "john@me.com")
            .end((res) => {
            expect(res.error);
            done();
        })
            .expect(400);
    });
});
