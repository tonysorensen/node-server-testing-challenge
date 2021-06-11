const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')
const Blackhole = require('./blackholes/blackhole_model');

const listOfBlackholes = [{ name: 'M87' }, { name: 'NGC123' }]

beforeAll(async () => {
    await db.migrate.rollback() // takes back the db to the stone age
    await db.migrate.latest() // bringing to the latest
  })
  beforeEach(async () => {
    await db('blackholes').truncate() // wipes rows, and resets id numbers
  })
  afterAll(async () => {
    await db.destroy()
  })

  describe('[GET] /', () => {
    beforeEach(async () => {
      await db('blackholes').insert(listOfBlackholes)
    })
    it('responds with a 200 OK', async () => {
      const res = await request(server).get('/')
      expect(res.status).toBe(200)
    })
    it('returns a list of blackholes', async () => {
      const res = await request(server).get('/')
      console.log(res.body)
      console.log(res.status)
      console.log(res.headers)
      expect(res.body).toMatchObject(listOfBlackholes)
      expect(res.body[0]).toMatchObject({ name: 'M87' })
      expect(res.body[0]).toHaveProperty('name', 'M87')
  
      
      // const res = request(server).post('/hobbits').send({ name: 'pippin' })
    })
    describe('[POST] /', () => {
        it('creates a black hole and returns it', async () => {
          const res = await request(server).post('/').send({ name: 'Centaurus A' });
    
          expect(res.body).toMatchObject({ name: 'Centaurus A' }); // Verify the response
          expect(await Blackhole.getAll()).toHaveLength(3); // Verify that the record was inserted into the db
        });
        it("returns null for name but still creates an object when an empty object is inserted to the table", async () => {
            const res = await request(server).post('/').send({});
           
          
            expect(res.body).toMatchObject({ name: null });
            expect(await Blackhole.getAll()).toHaveLength(3);
          });
      });
  })

  describe('[DELETE] /:id', () => {
      //don't forget to create a black hole first
    let blackhole;
    beforeEach(async () => {
      blackhole = await Blackhole.insert({ name: 'Centaurus B' });
    });

    it('deletes the black hole when it exists', async () => {
      const res = await request(server).delete(`/${blackhole.id}`).expect(200);

      expect(res.body).toMatchObject({ message: 'Successfully removed black hole' }); // Verify the response
      expect(await Blackhole.getById(blackhole.id)).toBeUndefined(); // Verify that the hobbit was removed from the db
    });

    it(`returns a 404 when the blackhole doesn't exist`, async () => {
      const res = await request(server).delete('/12345');

      expect(res.body).toMatchObject({ message: 'Black hole not found' }); // Verify the response
      expect(await Blackhole.getById(blackhole.id)).not.toBeUndefined(); // Verify that the other hobbit was not removed from the db
    });
  });