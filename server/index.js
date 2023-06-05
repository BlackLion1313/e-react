import express from "express";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5001;


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());


app.listen(port, () => {
  console.log("Server is running on bla port" + port);
});