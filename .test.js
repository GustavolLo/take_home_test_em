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
      workflowName: "workflow 1",
      entity: {
        name: "project 1",
        type: "project",
        status: "status 1",
      },
    };
    const response = await axios.post(url + "/workflow/add", params);
    expect(response.status).toEqual(200);
  });
});
