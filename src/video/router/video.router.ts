import { Request, Response, Router } from "express";
import { exampleDb } from "../../db/temp-db";
import { createNewVideo } from "../utils";
import { NewVideoReq, PutVideoReq } from "../types/video";
import { statuses } from "../../core/const/statuses";
import { createBaseError } from "../../core/utils/baseError";

export const videoRouter = Router({});

videoRouter

  // получить все видео
  .get("", (_, res: Response) => {
    res.status(statuses.ok).send(exampleDb);
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
  .post("/", (req: Request<{}, {}, NewVideoReq>, res: Response) => {
    const newVideo = createNewVideo(req.body);
    // todo валидация
    exampleDb.videos.push(newVideo);
    res.status(statuses.created).send(newVideo);
  })

  // обновление видео
  .put(
    "/:id",
    (req: Request<{ id: string }, {}, PutVideoReq>, res: Response) => {
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
      // todo валидация

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
