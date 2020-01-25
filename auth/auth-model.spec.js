const model = require("./auth-model");
const db = require("../database/dbConfig");

beforeEach(async () => {
    await db.seed.run();
});

describe("user model", () => {
    test("find", async() => {
        const res = await model.find();
        
        expect(res).toHaveLength(2);
        expect(res[0].username).toBe("dan");
    });

    test("add", async () => {
        await model.add({username: "harold", password: "password"});
        const res = await model.find();

        expect(res).toHaveLength(3);
    });

    test("delete", async () => {
        const deleted = await model.remove(1);

        expect(deleted).toBeGreaterThan(0);
    });

});

