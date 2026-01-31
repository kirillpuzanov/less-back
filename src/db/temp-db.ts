import { addDay } from "../core/utils/date";
import { Video } from "../video/types/video";

const createdDate = new Date().toISOString();

export const exampleDb: Record<"videos", Video[]> = {
  videos: [
    {
      id: 1,
      title: "1-video",
      author: "Any",
      canBeDownloaded: true,
      minAgeRestriction: 7,
      createdAt: createdDate,
      publicationDate: addDay(createdDate),
      availableResolutions: ["P360", "P720"],
    },

    {
      id: 2,
      title: "2-video",
      author: "Any",
      canBeDownloaded: true,
      minAgeRestriction: 7,
      createdAt: createdDate,
      publicationDate: addDay(createdDate),
      availableResolutions: ["P360", "P720", "P240"],
    },
  ],
};
