import { Response, Router } from "express";
import { exampleDb } from "../../db/temp-db";


export const videoRouter = Router({});

videoRouter
  .get('', (_, res: Response) => {
    res.status(200).send(exampleDb);
  })

  .get('/drivers/:id', (req, res) => {
    const driverId = Number.parseInt(req.params.id);
    const driver = exampleDb.find((el) => el.id === driverId);

    if (!driver) {
      res.status(404).send('Not found')
    }
    res.status(200).send(driver)
  })

// .post('/drivers', (_, res) => {
//   const newDriverId = new Date().getTime();
//   const newDriver = {
//     id: newDriverId,
//     title: `title-${newDriverId}`,
//     createdAt: new Date().toISOString(),
//   }
//   exampleDb.push(newDriver)
//   res.sendStatus(201)
// })