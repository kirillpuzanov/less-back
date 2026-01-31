import { NewVideoInput, Video } from "./types/video";
import { addDay } from "../core/utils/date";

export const createNewVideo = (newVideo: NewVideoInput): Video => {
  const today = new Date().toISOString();
  return {
    ...newVideo,
    id: new Date().getTime(),
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: today,
    publicationDate: addDay(today),
  };
};
