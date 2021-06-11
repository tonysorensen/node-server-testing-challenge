const Blackhole = require("./blackhole_model");
const db = require("../../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("blackholes").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("Blackhole model", () => {
  describe("sanity", () => {
    test("Blackhole is defined", () => {
      expect(Blackhole).toBeDefined();
    });
    test("Environment is correct", () => {
      expect(process.env.NODE_ENV).toBe("testing");
    });
  });

  describe("getAll()", () => {
    describe("when there are blackholes", () => {
      it("returns an empty array when there are no blackholes", async () => {
        const blackholes = await Blackhole.getAll();

        expect(blackholes).toEqual([]);
      });
      it("returns an array of blackholes when there are blackholes", async () => {
        await Blackhole.insert({ name: "Messier 87" });
        await Blackhole.insert({ name: "Sagittarius A" });
        await Blackhole.insert({ name: "NGC 1277" });

        const blackholes = await Blackhole.getAll();

        expect(blackholes).toHaveLength(3);
        expect(blackholes[0]).toMatchObject({ name: "Messier 87" });
      });
    });
  });
});
