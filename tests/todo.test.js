const app = require("./../app");
// const request = require("supertest");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
beforeAll((done) => {
  queryInterface
    .bulkInsert(
      "Todos",
      [
        {
          id: 123,
          title: "Belajar express",
          description: "belajar backend programming dengan framework expressJS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 124,
          title: "Belajar js",
          description: "belajar backend programming dengan js",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Todos", null, {})
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

// test("add todo", async () => {
//   const response = await request(app).post("todo/add").send({
//     title: "Ngopi",
//     description: "ngopi dulu gak sih",
//   });

//   expect(response.statusCode).toEqual(201);
// });

// test("get all todos", async () => {
//   const response = await request(app).get("/todo");
//   expect(response.statusCode).toEqual(200);
//   expect(response.body.status).toBe("success");
// });

describe("GET /todos", () => {
  it("Get Todo List", (done) => {
    request(app)
      .get("/todo")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        const { data } = res.body;
        expect(data.length).toBeGreaterThanOrEqual(1);
        const firstData = data[0];

        expect(firstData.title).toEqual("Belajar express");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /todos", () => {
  it("New Todo List Created Successfully", (done) => {
    request(app)
      .post("/todo/add")
      .send({
        title: "Ngopi",
        description: "ngopi bang",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        const { status, data } = res.body;
        expect(status).toEqual("success");
        expect(data.title).toEqual("Ngopi");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /todo/:id", () => {
  it("Todo List Update Successfully", (done) => {
    request(app)
      .put(`/todo/${123}`)
      .send({
        title: "Push Rank mobile legend",
        description: "push rank sampai mampus",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        const { status, data } = res.body;

        expect(status).toEqual("success");
        expect(data.title).toEqual("Push Rank mobile legend");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /todos/:id", () => {
  it("Get Todo List Detail", (done) => {
    request(app)
      .get(`/todo/${124}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        const { data } = res.body;
        expect(data.id).toEqual(124);
        expect(data.title).toEqual("Belajar js");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /todo/:id", () => {
  it("Delete Todo List Successfully", (done) => {
    request(app)
      .delete(`/todo/${124}`)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        const { message } = res.body;

        expect(message).toEqual("berhasil mengahapus data dengan id 124");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
