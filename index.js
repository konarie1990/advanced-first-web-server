const state = require("./state");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(express.json());

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

// app.delete("/users/1", (req, res) => {
//   state.users.shift();
//   res.send("DELETED THE ITEM");
// });

// post from the client side using "name": object {}
app.post("/users", (req, res) => {
  let user = {
    id: state.users.length + 1,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  };
  state.users.push(user);
  res.json(user);
});

// GET userId through url path users/:userId
app.get("/users/:userId", (req, res) => {
  res.send(state.users[req.params.userId]);
});

// PUT to change any key value from client side

app.put("/users/:userId", (req, res) => {
  // let updateId = { _id: ObjectID(req.params.id) };
  let user = {
    id: req.body._id,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  };
  res.send(user);
});

app.delete("/users/:userId", (req, res) => {
  state.users.shift(state.users[req.params.userId]);
});
