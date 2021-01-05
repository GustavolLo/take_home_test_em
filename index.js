const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const controller = require("./controller");

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

app.get("/workflow", controller.getWorkflows);

app.post("/workflow", controller.createWorkflow);

app.post("/workflow/add", controller.addEntity);
