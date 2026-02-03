import request from "supertest";
import { setupApp } from "../src/setup-app";
import express from "express";
import { statuses } from "../src/core/const/statuses";
import { createNewVideo } from "../src/video/utils";
import { routes } from "../src/core/const/routes";

describe("Video API body validation", () => {
  const app = express();
  setupApp(app);

  const newCorrectVideo = createNewVideo({
    title: "test",
    author: "testTitle",
    availableResolutions: ["P144"],
  });

  beforeAll(async () => {
    await request(app).delete("/testing/all-data").expect(statuses.noContent);
  });

  it(`should not create video when incorrect body passed; POST /videos'`, async () => {
    const invalidDataSet1 = await request(app)
      .post(routes.videos)
      .send({
        ...newCorrectVideo,
        title: " ",
        author: "  ",
      })
      .expect(statuses.badRequest);

    expect(invalidDataSet1.body.errorsMessages).toHaveLength(2);

    const invalidDataSet2 = await request(app)
      .post(routes.videos)
      .send({
        ...newCorrectVideo,
        availableResolutions: null,
      })
      .expect(statuses.badRequest);

    expect(invalidDataSet2.body.errorsMessages).toHaveLength(1);

    // check что ничего не создалось
    const allVideoResponse = await request(app).get(routes.videos);
    expect(allVideoResponse.body).toHaveLength(0);
  });

  it(`should create video when correct body passed; POST /videos'`, async () => {
    const validDataSet = await request(app)
      .post(routes.videos)
      .send(newCorrectVideo)
      .expect(statuses.created);

    expect(validDataSet.body.errorsMessages).toBeUndefined();

    // check что видео создалось
    const allVideoResponse = await request(app).get(routes.videos);
    expect(allVideoResponse.body[0].title).toBe("test");
  });
  it("should not update video when incorrect data passed; PUT /videos/:id", async () => {
    const {
      body: { id },
    } = await request(app)
      .post(routes.videos)
      .send(newCorrectVideo)
      .expect(statuses.created);

    const invalidDataSet = await request(app)
      .put(`${routes.videos}/${id}`)
      .send({
        ...newCorrectVideo,
        availableResolutions: {},
        canBeDownloaded: 18,
      })
      .expect(statuses.badRequest);

    expect(invalidDataSet.body.errorsMessages).toHaveLength(2);
  });
});
