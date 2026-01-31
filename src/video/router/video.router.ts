import { Request, Response, Router } from "express";
import { exampleDb } from "../../db/temp-db";
import { createNewVideo } from "../utils";
import { NewVideoInput, UpdateVideoInput } from "../types/video";
import { statuses } from "../../core/const/statuses";
import { createBaseError } from "../../core/utils/baseError";
import {
  createVideoValidation,
  updateVideoValidation,
} from "../validation/videoValidation";

export const videoRouter = Router({});

videoRouter

  // получить все видео
  .get("", (_, res: Response) => {
    res.status(statuses.ok).send(exampleDb.videos);
  })

  // получить видео по id
  .get("/:id", (req, res) => {
    const videoId = Number.parseInt(req.params.id);
    const video = exampleDb.videos.find((el) => el.id === videoId);

    if (!video) {
      res.status(statuses.notFound).send(
        createBaseError([
          {
            field: "id",
            message: `not found video with id - ${videoId}`,
          },
        ]),
      );
    }
    res.status(statuses.ok).send(video);
  })

  // создание видео
  .post("/", (req: Request<{}, {}, NewVideoInput>, res: Response) => {
    const errors = createVideoValidation(req.body);

    if (errors.length > 0) {
      res.status(statuses.badRequest).send(createBaseError(errors));
      return;
    }

    const newVideo = createNewVideo(req.body);
    exampleDb.videos.push(newVideo);
    res.status(statuses.created).send(newVideo);
  })

  // обновление видео
  .put(
    "/:id",
    (req: Request<{ id: string }, {}, UpdateVideoInput>, res: Response) => {
      const videoId = Number.parseInt(req.params.id);
      const idx = exampleDb.videos.findIndex((el) => el.id === videoId);

      if (idx === -1) {
        res.status(statuses.notFound).send(
          createBaseError([
            {
              field: "id",
              message: `not found video with id - ${videoId}`,
            },
          ]),
        );
      }
      const errors = updateVideoValidation(req.body);

      if (errors.length > 0) {
        res.status(statuses.badRequest).send(createBaseError(errors));
        return;
      }

      const currentVideo = exampleDb.videos[idx];
      const {
        title,
        author,
        availableResolutions,
        canBeDownloaded,
        minAgeRestriction,
        publicationDate,
      } = req.body;
      currentVideo.title = title;
      currentVideo.author = author;
      currentVideo.availableResolutions = availableResolutions;
      currentVideo.canBeDownloaded = canBeDownloaded;
      currentVideo.minAgeRestriction = minAgeRestriction;
      currentVideo.publicationDate = publicationDate;

      res.sendStatus(statuses.noContent);
    },
  )

  // удаление видео по id
  .delete("/:id", (req: Request<{ id: string }>, res: Response) => {
    const videoId = Number.parseInt(req.params.id);
    const idx = exampleDb.videos.findIndex((el) => el.id === videoId);

    if (idx === -1) {
      res.status(statuses.notFound).send(
        createBaseError([
          {
            field: "id",
            message: `not found video with id - ${videoId}`,
          },
        ]),
      );
    }
    exampleDb.videos.splice(idx, 1);
    res.sendStatus(statuses.noContent);
  });
