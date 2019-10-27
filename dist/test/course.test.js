describe("GET /contact", () => {
    it("should return 200 OK", (done) => {
        request(app).get("/api/courses")
            .expect(417, done);
    });
});
