import app from "../app.js";
import request from "supertest";
import jest from "jest";
describe("Login User", () => {
  it("should login user", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "gsaraf895@gmail.com",
      password: "Gaurav",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});

describe("Register User", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      email: "test@gmail.com",
      password: "Gaurav",
      name: "Gaurav",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
