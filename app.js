const express = require("express");

const { pingApi } = require("./controllers/api.controller");
const { getCategories } = require("./controllers/getCategories.controller");
const { getReviewId } = require("./controllers/getReviewId.controller");
const {
  patchReviewVotes,
} = require("./controllers/patchReviewVotes.controller");

const app = express();
app.use(express.json());

app.get("/api", pingApi);

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewId);

app.patch("/api/reviews/:review_id", patchReviewVotes);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Page/File Not Found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid Input" });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
