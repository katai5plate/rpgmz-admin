import express from "express";
import cors from "cors";
import fs from "fs-extra";
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ result: true });
});

export interface ApiGamesPayload {
  games: string[];
}
app.get("/games", (req, res) => {
  const games = fs.readdirSync(path.resolve(process.cwd(), "games"));
  res.status(200).send({ games });
});

// app.get("/api/courses", (req, res) => {
//   res.send(courses);
// });

// app.get("/api/courses/:id", (req, res) => {
//   const course = courses.find((c) => c.id === parseInt(req.params.id));
//   if (!course)
//     return res.status(404).send("The course with the given ID was not found.");
//   res.send(course);
// });

// app.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.query);
// });

// app.post("/api/courses", (req, res) => {
//   const course = {
//     id: courses.length + 1,
//     name: req.body.name,
//   };
//   courses.push(course);
//   res.send(course);
// });

// app.put("/api/courses/:id", (req, res) => {
//   const course = courses.find((c) => c.id === parseInt(req.params.id));
//   if (!course)
//     return res.status(404).send("The course with the given ID was not found.");

//   course.name = req.body.name;
//   res.send(course);
// });

// app.delete("/api/courses/:id", (req, res) => {
//   const course = courses.find((c) => c.id === parseInt(req.params.id));
//   if (!course)
//     return res.status(404).send("The course with the given ID was not found.");

//   const index = courses.indexOf(course);
//   courses.splice(index, 1);

//   res.send(course);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
