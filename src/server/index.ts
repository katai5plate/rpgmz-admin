import cors from "cors";
import express, { type Response } from "express";
import fs from "fs-extra";
import { JSDOM } from "jsdom";
import path from "path";
import type { Package } from "rpgmz-typescript/types";
import { API_URL } from "../router";

const app = express();

app.use(express.json());
app.use(cors());

export interface ApiResultRes {
  result: boolean;
}

const handler = <R = ApiResultRes>(res: Response, process: () => R) => {
  try {
    res.status(200).send(process());
  } catch (error) {
    res.status(400).send({ error });
  }
};

app.get(API_URL.GET$PING(), (_, res) => {
  handler(res, () => ({ result: true }));
});

export interface ApiGamesRes {
  games: string[];
}
app.get(API_URL.GET$GAME_NAMES(), (_, res) => {
  handler<ApiGamesRes>(res, () => {
    const games = fs.readdirSync(path.resolve(process.cwd(), "games"));
    return { games };
  });
});

export interface ApiGamesGameRes {
  title: string;
  package: Package;
}
app.get(API_URL.GET$GAME_META(), (req, res) => {
  handler<ApiGamesGameRes>(res, () => {
    const dir = path.resolve(process.cwd(), "games", req.params.game);
    const json = fs.readJSONSync(path.resolve(dir, "package.json")) as Package;
    const html = new JSDOM(
      fs.readFileSync(path.resolve(dir, "index.html"), {
        encoding: "utf8",
      })
    );
    return {
      title:
        html.window.document.querySelector("title")?.textContent ??
        json.window.title,
      package: json,
    };
  });
});

// export interface ApiGamesGameRenameBody {
//   name: string;
// }
// app.put("/games/:game/rename", (req, res) => {
//   handler(res, () => {
//     const dir = path.resolve(process.cwd(), "games", req.params.game);
//     const json = fs.readJSONSync(path.resolve(dir, "package.json")) as Package;
//     const html = new JSDOM(
//       fs.readFileSync(path.resolve(dir, "index.html"), {
//         encoding: "utf8",
//       })
//     );
//     const body = req.body as ApiGamesGameRenameBody;
//     json.window.title = body.name;
//     const title = html.window.document.querySelector(
//       "title"
//     ) as HTMLTitleElement;
//     title.innerText = body.name;
//     const after = () => `<!DOCTYPE html>
// <html>
//     <head>
//         ${html.window.document.head.innerHTML.trim()}
//     </head>
//     <body style="background-color: black">
//         ${html.window.document.body.innerHTML.trim()}
//     </body>
// </html>`;
//     fs.writeJSONSync(path.resolve(dir, "package.json"), json, { spaces: 4 });
//     fs.writeFileSync(path.resolve(dir, "index.html"), after());
//     return { result: true };
//   });
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
  console.log(`[${new Date().toLocaleString()}] Listening on port ${port}...`);
});
