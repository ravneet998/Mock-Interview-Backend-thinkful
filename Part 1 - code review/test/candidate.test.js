const request = require("supertest");
const { createServer } = require("../src/server");

describe("server", () => {
  let knex;
  let server;
  let app;

  beforeAll(() => {
    knex = require("knex")({
      client: "pg",
      connection: process.env.DATABASE_URL || "postgresql://postgres@localhost",
    });
  });
  beforeEach((done) => {
    server = createServer(knex);
    app = server.app;
    const today = new Date();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const tomorrow = new Date(Date.now() - 24 * 60 * 60 * 1000);

    knex.schema
      .dropTableIfExists("ticket")
      .dropTableIfExists("employee")
      .dropTableIfExists("customer")
      .then(() =>
        knex.schema.createTable("employee", (table) => {
          table.increments();
          table.string("username");
          table.string("first_name");
          table.string("last_name");
        })
      )
      .then(() =>
        knex.schema.createTable("customer", (table) => {
          table.increments();
          table.string("name");
          table.string("address");
          table.datetime("date_joined");
          table.string("contact_name");
          table.string("contact_number");
        })
      )
      .then(() =>
        knex.schema.createTable("ticket", (table) => {
          table.increments();
          table
            .integer("employee_id")
            .references("id")
            .inTable("employee")
            .notNull();
          table
            .integer("customer_id")
            .references("id")
            .inTable("customer")
            .notNull();
          table.datetime("case_start_date");
          table.datetime("resolution_date");
          table.string("status");
        })
      )
      .then(() =>
        knex("employee").insert({
          username: "jdoe",
          first_name: "Jane",
          last_name: "Doe",
        })
      )
      .then(() =>
        knex("employee").insert({
          username: "fweaver",
          first_name: "Francis",
          last_name: "Weaver",
        })
      )
      .then(() =>
        knex("customer").insert({
          name: "ABC Company",
          address: "549 Main St. Durham NC",
          date_joined: yesterday,
          contact_name: "Taylor Patil",
          contact_number: "999-999-9999",
        })
      )
      .then(() =>
        knex("customer").insert({
          name: "Acme Corp",
          address: "245 Birch Ln. San Francisco, CA",
          date_joined: yesterday,
          contact_name: "Estevan Suarez",
          contact_number: "441-333-2255",
        })
      )
      .then(() =>
        knex("ticket").insert({
          employee_id: 1,
          customer_id: 1,
          case_start_date: today,
          resolution_date: tomorrow,
          status: "in_progress",
        })
      )
      .then(() =>
        knex("ticket").insert({
          employee_id: 1,
          customer_id: 2,
          case_start_date: yesterday,
          resolution_date: today,
          status: "completed",
        })
      )
      .then(() =>
        knex("ticket").insert({
          employee_id: 2,
          customer_id: 1,
          case_start_date: tomorrow,
          status: "in_queue",
        })
      )
      .then(() => done())
      .catch((err) => done(err));
  });
  afterEach((done) => server.close(done));
  afterAll(() => knex.destroy());

  it("should get information about a ticket based on id", (done) => {
    request(app)
      .get("/tickets/2")
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.data).toBeInstanceOf(Object);
        expect(response.body.data[0].id).toEqual(2);
        done();
      })
      .catch((err) => done(err));
  });

  it("should get create a ticket", (done) => {
    const ticketInformation = {
      employee_id: 2,
      customer_id: 1,
      case_start_date: new Date(),
      status: "in_progress",
    };
    request(app)
      .post("/tickets")
      .send(ticketInformation)
      .then((response) => {
        expect(response.status).toEqual(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.data).toBeInstanceOf(Object);
        expect(response.body.data[0].id).toEqual(4);
        done();
      })
      .catch((err) => done(err));
  });

  it("should get information about a ticket, including the employee associated with the ticket", (done) => {
    request(app)
      .get("/tickets/2")
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.data).toBeInstanceOf(Object);
        expect(response.body.data[0].id).toEqual(2);
        expect(response.body.data[0].employee_id).toEqual(1);
        done();
      })
      .catch((err) => done(err));
  });
});
