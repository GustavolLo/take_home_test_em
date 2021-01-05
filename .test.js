const axios = require("axios");

const url = "http://localhost:3000";

/**
 * Need to empty the collection workflows to make tests success.
 */

describe("Workflow API", () => {
  it("should create workflow and retrieve it", async () => {
    // Creating workflow
    const name = "workflow " + Math.round(Math.random() * 100).toString();
    var params = {
      name: name,
      entities: [],
      states: ["state 1", "state 2", "state 3"],
    };
    var response = await axios.post(url + "/workflow", params);
    expect(response.status).toEqual(200);

    // Getting workflow created
    var workflow = await axios.get(url + "/workflow");
    workflow = workflow.data[0];
    console.log(workflow);
    expect(workflow.name).toEqual(name);
    expect(workflow.entities).toEqual([]);
    expect(workflow.states).toEqual(["state 1", "state 2", "state 3"]);

    // Adding an entity project to workflow
    params = {
      entity: {
        name: "project 3",
        type: "project",
        status: "status 1",
      },
    };
    response = await axios.post(
      url + "/workflow/" + workflow._id + "/add",
      params
    );
    expect(response.status).toEqual(200);

    // Updating state of entity
    workflow = await axios.get(url + "/workflow");
    workflow = workflow.data[0];
    params = {
      action: "update state",
    };
    response = await axios.post(
      url + "/workflow/" + workflow._id + "/entity/" + workflow.entities[0].id,
      params
    );
    expect(response.status).toEqual(200);
  });
  //   it("should respond OK to rename status in workflow", async () => {
  //     const params = {
  //       action: "rename state",
  //       state: "state 3",
  //       newState: "Validé",
  //     };
  //     const response = await axios.post(
  //       url + "/workflow/5ff4a12d124d50390002e8b0",
  //       params
  //     );
  //     expect(response.status).toEqual(200);
  //   });
});
