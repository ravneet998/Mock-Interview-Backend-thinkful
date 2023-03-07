const request = require("supertest");

const app = require("../src/app");
const knex = require("../src/db/connection");

describe("server", () => {
  beforeAll(() => {
    return knex.migrate
      .forceFreeMigrationsLock()
      .then(() => knex.migrate.rollback(null, true))
      .then(() => knex.migrate.latest())
      .then(console.log);
  });

  beforeEach(() => {
    return knex.seed.run();
  });

  afterAll(async () => {
    return await knex.migrate.rollback(null, true).then(() => knex.destroy());
  });

  it("POST /customers creates a new customer", async () => {
    const data = {
      name: "Test Company",
      address: "454 Main St.",
      date_joined: new Date(),
      contact_name: "Test User",
      contact_number: "229-323-3332",
    };

    const response = await request(app).post("/customers").send({ data });

    expect(response.body.error).toBeUndefined();
    expect(response.body.data).toEqual(
      expect.objectContaining({
        ...data,
        date_joined: expect.anything(),
        id: 3,
      })
    );
    expect(response.status).toEqual(201);
  });

  it("GET /customers/:customerId return an existing customer", async () => {
    const expected = {
      id: 2,
      name: "Acme Corp",
      address: "245 Birch Ln. San Francisco, CA",
      date_joined: "2021-01-02",
      contact_name: "Estevan Suarez",
      contact_number: "441-333-2255",
    };

    const response = await request(app).get("/customers/2");

    expect(response.body.error).toBeUndefined();
    expect(response.body.data).toEqual(
      expect.objectContaining({
        ...expected,
        date_joined: expect.anything(),
      })
    );
    expect(response.status).toEqual(200);
  });
});
