const { MongoClient } = require("mongodb");

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
    const { workflowName, entity } = req.body;
    (async function query() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = await client.db(dbName);
        const col = await db.collection("workflows");
        const workflow = await col.findOne({ name: workflowName });
        if (workflow) {
          const entities = [...workflow.entities, entity];
          await col.updateOne(
            { name: workflowName },
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
};
