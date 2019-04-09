const state = require("./state");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/users", (req, res) => res.send(state.users));

app.get("/users/1", (req, res) => res.send(state.users[0]));

app.post("/users", (req, res) => {
  state.users.push({
    _id: 6,
    name: "TEST NAME",
    occupation: "SPECIAL AGENT",
    avatar: "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"
  });
  res.json(state.users[state.users.length - 1]);
});

app.put("/users/1", (req, res) => {
  state.users[0]["name"] = "TESTING";
  res.json(state.users[0]);
});

app.delete("/users/1", (req, res) => {
  state.users.shift();
  res.send("DELETED THE ITEM");
});

app.post("/users", (req, res) => {});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
