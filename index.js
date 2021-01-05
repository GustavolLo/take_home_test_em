const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Workflow API running!");
});

app.listen(port, () => {
  console.log(`Workflow API listening at http://localhost:${port}`);
});

const url = "mongodb://localhost:27017";
const dbName = "workflowdb";

app.get("/workflow", (req, res) => {
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
});

app.post("/workflow", (req, res) => {
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
});
