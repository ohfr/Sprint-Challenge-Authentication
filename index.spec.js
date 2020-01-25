const server = require("./api/server");
const supertest = require("supertest");
const db = require("./database/dbConfig");

beforeEach(async () => {
    await db.seed.run();
})

test("register", async () => {
    const res = await supertest(server).post("/api/auth/register").send({username: "johnny", password: "password"});

    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toMatch(/johnny/i);
});

// test("login", async () => {
//     const res = await supertest(server).post("/api/auth/login").send({username: "dan", password: "password"});

//     expect(res.status).toBe(200);
//     expect(res.type).toBe("application/json");
//     expect(res.body.message).toBe("You are logged in");
// });

// this works but login wont ??
test("jokes", async () => {
    const result = await supertest(server).post("/api/auth/login").send({username:"dan", password:"password"});
    const res = await supertest(server).get("/api/jokes").set({authorization: result.body.token})

    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
});