const { MongoClient, ObjectID } = require("mongodb");
const { v1: uuid } = require("uuid");

const url = "mongodb://localhost:27017";
const dbName = "workflowdb";

module.exports = {
  getWorkflows(req, res) {
    (async function query() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = await client.db(dbName);
        const col = await db.collection("workflows");
        const workflows = await col.find().toArray();
        res.send(workflows);
      } catch (error) {
        res.send(error);
      }
      client.close();
    })();
  },
  createWorkflow(req, res) {
    const workflow = req.body;
    (async function query() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = await client.db(dbName);
        const col = await db.collection("workflows");
        await col.insertOne(workflow);
        res.send("Request sent to workflowdb.");
      } catch (error) {
        res.send(error);
      }
      client.close();
    })();
  },
  addEntity(req, res) {
    const { id } = req.params;
    const { entity } = req.body;
    (async function query() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = await client.db(dbName);
        const col = await db.collection("workflows");
        const workflow = await col.findOne({ _id: new ObjectID(id) });
        if (workflow) {
          const entities = [...workflow.entities, { ...entity, id: uuid() }];
          console.log(entities);
          await col.updateOne(
            { _id: new ObjectID(id) },
            { $set: { entities: entities } }
          );
          res.send("Request sent to workflowdb.");
        }
      } catch (error) {
        res.send(error);
      }
      client.close();
    })();
  },
  updateEntity(req, res) {
    const { id, entity } = req.params;
    if (req.body.action === "update state") {
      (async function query() {
        let client;
        try {
          client = await MongoClient.connect(url);
          const db = await client.db(dbName);
          const col = await db.collection("workflows");
          const workflow = await col.findOne({ _id: new ObjectID(id) });
          if (workflow) {
            const entities = workflow.entities.map((element) => {
              if (element.id === entity) {
                const index = workflow.states.findIndex(
                  (state) => state === element.status
                );
                console.log(element);
                if (
                  element.type === "project" &&
                  index < workflow.states.length - 1
                ) {
                  console.log("project case");
                  element.status = workflow.states[index + 1];
                }
                if (element.type === "chart") {
                  console.log("chart case");
                  element.status =
                    workflow.states[(index + 1) % workflow.states.length];
                }
              }
              return element;
            });
            console.log(entities);
            await col.updateOne(
              { _id: new ObjectID(id) },
              { $set: { entities: entities } }
            );
            res.send("Request sent to workflowdb.");
          }
        } catch (error) {
          res.send(error);
        }
        client.close();
      })();
    }
  },
};
