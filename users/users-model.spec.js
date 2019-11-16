const db = require('../database/dbConfig');
const {
  add,
  find,
  findBy,
  findById } = require('./users-model');

describe('usersModel', () => {

  describe('add()', () => {
    beforeEach(async () => {
      await db("users").truncate();
    })


    it('should insert a user', async () => {
      await add({ username: "Greg", password: "1234" })
      const users = await db('users')
      expect(users).toHaveLength(1);
    })

    it('should insert the users', async () => {

      await add({ username: "Steve", password: "1234" })
      await add({ username: "Sam", password: "1234" })

      const users = await db('users');

      expect(users).toHaveLength(2);
      expect(users[0].username).toBe('Steve');
      expect(users[1].username).toBe('Sam');

    })

    it("should return the added user", async function () {
      let user = await add({ username: "Bill", password: "1234" });
      expect(user.username).toBe("Bill");
      expect(user.id).toBeDefined(); // now I know it's coming from the db

      user = await add({ username: "Ted", password: "1234" });
      expect(user.username).toBe("Ted");
      expect(user.id).toBeDefined();
    });
  }) // describe(add)


  describe('find()', () => {
    beforeEach(async () => {
      await db("users").truncate();
    })
    it('should return an arry of users', async () => {
      await add({ username: "Bill", password: "1234" })
      await add({ username: "Ted", password: "1234" });

      let allUsers = await find();
      expect(typeof allUsers).toBe("object");

    })
    it('should have a user named Bill', async () => {
      await add({ username: "Bill", password: "1234" })
      let allUsers = await find();
      expect(allUsers[0].username).toBe("Bill");



    })
  })

  describe('findBy()', () => {
    beforeEach(async () => {
      await db("users").truncate();
    })

    it('should return a Bill by searching username Bill', async () => {
      await add({ username: "Bill", password: "1234" });
      let found = await findBy({ username: "Bill" })

      expect(found[0].username).toBe("Bill");
    })
    it('should return a Ted by searching username Ted', async () => {
      await add({ username: "Ted", password: "1234" });
      let found = await findBy({ username: "Ted" })
      expect(typeof found).toBe("object");
      expect(found[0].username).toBe("Ted");
    })

  })// describe findBy()

  describe('findById()', () => {
    beforeEach(async () => {
      await db("users").truncate();
    })

    it('should return username bill with id: 1', async () => {
      await add({ username: "Bill", password: "1234" })
      let Bill = await findById(1);
      expect(Bill.username).toBe("Bill");
    })
    it('should return username Ted with id: 1', async () => {
      await add({ username: "Ted", password: "1234" })
      await add({ username: "Bill", password: "1234" })
      let Ted = await findById(1);
      let Bill = await findById(2);
      expect(Ted.username).toBe("Ted");
      expect(Ted.id).toBeDefined();
      expect(Bill.username).toBe("Bill");
    })
    it('should return id: 1, username: Bill, id:2, username: Ted', async () => {
      await add({ username: "Bill", password: "1234" })
      await add({ username: "Ted", password: "1234" })
      let Ted = await findById(2);
      let Bill = await findById(1);
      expect(Bill.username).toBe("Bill");
      expect(Ted.username).toBe("Ted");



    })

  })



})// describe('usersModel')


















/*  describe("remove()", () => {
     beforeEach(async () => {
       await db("users").truncate();
     })


     it('should return 1', async () => {
       await add({ username: "Bill", password: "1234" })
       await add({ username: "Ted", password: "1234" });
       let deletes = await remove(1)
       expect(deletes).toBe(1);
     })

   }) */// describe remove