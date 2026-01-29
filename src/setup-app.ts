import express, { Application } from "express";
import { videoRouter } from "./video/router/video.router";


export const setupApp = (app: Application) => {
  app.use(express.json())

  app.get('/', (_, res) => {
    res.status(200).send('Good luck!')
  })

  app.use('/videos', videoRouter)
}