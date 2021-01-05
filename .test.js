const axios = require("axios");

const url = "http://localhost:3000";

describe("Workflow API", () => {
  it("should respond OK to get workflows endpoint", async () => {
    const response = await axios.get(url + "/workflow");
    expect(response.status).toEqual(200);
  });
  it("should respond OK to create workflow endpoint", async () => {
    const params = {
      name: "workflow 3",
      entities: [],
      states: ["state 1", "state 2", "state 3"],
    };
    const response = await axios.post(url + "/workflow", params);
    expect(response.status).toEqual(200);
  });
  it("should respond OK to add entity endpoint", async () => {
    const params = {
      entity: {
        name: "project 3",
        type: "project",
        status: "status 1",
      },
    };
    const response = await axios.post(
      url + "/workflow/5ff4778a90a50057d8ca5c6c/add",
      params
    );
    expect(response.status).toEqual(200);
  });
});
