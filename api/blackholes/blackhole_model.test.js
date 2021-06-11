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

  describe("insert()", () => {
    it("creates a black hole!", async () => {
      const blackhole = await Blackhole.insert({ name: "Centaurus A" });
      const blackholes = await Blackhole.getAll();
      expect(blackhole).toMatchObject({ name: "Centaurus A" });
      expect(blackholes).toHaveLength(1);
    });
    it("returns null for name but still creates an object when an empty object is inserted to the table", async () => {
      const blackhole = await Blackhole.insert({});
      const blackholes = await Blackhole.getAll();
      expect(blackhole).toMatchObject({ name: null });
      expect(blackholes).toHaveLength(1);
    });
  });

  describe('remove()', () => {
      it('removes a black hole', async () => {
         
          await Blackhole.insert({ name: "Messier 87" });
          await Blackhole.insert({ name: "Sagittarius A" });
          await Blackhole.insert({ name: "NGC 1277" });
          const {id: newBlackHoleId}=await Blackhole.insert({name:"CG 483"})
          const blackholes = await Blackhole.getAll();
          expect(blackholes).toHaveLength(4)
          await Blackhole.remove(newBlackHoleId)
          const deleted = await Blackhole.getAll()
          expect(deleted).toHaveLength(3)
          expect(await Blackhole.getById(newBlackHoleId)).toBeUndefined()
        
      });
      it('no change to db if the id doesn`t match', async () => {
        await Blackhole.insert({ name: "Messier 87" });
        await Blackhole.insert({ name: "Sagittarius A" });
        await Blackhole.insert({ name: "NGC 1277" });
        const {id: newBlackHoleId}=await Blackhole.insert({name:"CG 483"})
        const blackholes = await Blackhole.getAll();
        expect(blackholes).toHaveLength(4)
        await Blackhole.remove(5)
        const noDelete = await Blackhole.getAll()
        expect(noDelete).toHaveLength(4)
        expect(await Blackhole.getById(newBlackHoleId)).toMatchObject({name:"CG 483"})
      });
      
      
      
  });
  
});
