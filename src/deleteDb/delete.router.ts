import { Response, Router } from "express";
import { exampleDb } from "../db/temp-db";
import { statuses } from "../core/const/statuses";

export const deleteDbRouter = Router({});

deleteDbRouter.delete("/all-data", (_, res: Response) => {
  exampleDb.videos = [];

  res.sendStatus(statuses.noContent);
});
