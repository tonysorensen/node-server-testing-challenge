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
    test('Environment is correct', () => {
        expect(process.env.NODE_ENV).toBe('testing')
      })
    
  });

  describe("getAll()", () => {
    describe("when there are blackholes", () => {
      it.todo("returns an array of blackholes");
      it.todo("has a length of 3");
    });
  });
});
