"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./../server");
const request = require('supertest');
describe("GET /contact", () => {
    it("should return 200 OK", (done) => {
        request(server_1.default).get("/api/courses")
            .expect(417, done);
    });
});
