import { NewVideoInput, Video } from "./types/video";
import { addDay } from "../core/utils/date";

export const createNewVideo = (newVideo: NewVideoInput): Video => {
  const today = new Date().toISOString();
  return {
    ...newVideo,
    id: new Date().getTime(),
    canBeDownloaded: true,
    minAgeRestriction: 8,
    createdAt: today,
    publicationDate: addDay(today),
  };
};
