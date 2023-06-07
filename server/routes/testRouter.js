import express from "express";
const router = express.Router();

router.get("/firstroute", (request, response) => {
  response.send("this is your first information sent by the server");
  console.log("this is happening because the client did a fetch");
  console.log("2");
});

export default router;