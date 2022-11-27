// https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357

const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
	res.json({ok: true})
});

const server = app.listen(3000, () => {
	console.log("server listening on 3000");
});

// to trigger SIGTERM, try to kill <pid> on a terminal window

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  server.close(() => {
    console.log("Http server closed.");
    // close also database connections, etc
    process.exit(0);
  });
});
