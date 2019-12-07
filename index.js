const express = require("express");
const server = express();
const postRouter = require("./routers/posts");

server.use(express.json());

server.use("/api/posts", postRouter);

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
