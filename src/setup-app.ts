import express, { Application } from "express";
import { exampleDb } from "./db/temp-db";


export const setupApp = (app: Application) => {
  app.use(express.json())

  app.get('/', (_, res) => {
    res.status(200).send('Hello World!')
  })

  app.get('/drivers', (_, res) => {
    res.status(200).send(exampleDb)
  })

  app.get('/drivers/:id', (req, res) => {

    const driverId = Number.parseInt(req.params.id);
    const driver = exampleDb.find((el) => el.id === driverId);

    if (!driver) {
      res.status(404).send('Not found')
    }
    res.status(200).send(driver)
  })

  app.post('/drivers', (_, res) => {
    const newDriverId = new Date().getTime();
    const newDriver = {
      id: newDriverId,
      title: `title-${newDriverId}`,
      createdAt: new Date().toISOString(),
    }
    exampleDb.push(newDriver)
    res.sendStatus(201)
  })
}