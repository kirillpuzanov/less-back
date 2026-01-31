import { NewVideoInput, UpdateVideoInput } from "../types/video";
import { BaseError } from "../../core/types/baseError";

const availableResolutionDict = {
  P144: "P144",
  P240: "P240",
  P360: "P360",
  P480: "P480",
  P720: "P720",
  P1080: "P1080",
  P1440: "P1440",
  P2160: "P2160",
} as const;

export const createVideoValidation = (data: NewVideoInput): BaseError[] => {
  const errors: BaseError[] = [];

  const { title, author, availableResolutions } = data || {};

  // ------- title
  if (typeof title !== "string" || !title.trim() || title.trim().length > 40) {
    errors.push({ field: "title", message: "Invalid title field" });
  }

  // ------- author
  if (
    typeof author !== "string" ||
    !author.trim() ||
    author.trim().length > 20
  ) {
    errors.push({ field: "author", message: "Invalid author field" });
  }

  // ------- availableResolutions

  // не массив
  if (!Array.isArray(availableResolutions)) {
    errors.push({
      field: "availableResolutions",
      message: "Invalid availableResolutions field type",
    });
  } else {
    // пустой массив
    if (!availableResolutions.length) {
      errors.push({
        field: "availableResolutions",
        message: "availableResolutions field not be empty",
      });
      return errors;
    }

    const availableResolutionCount = Object.values(
      availableResolutionDict,
    ).length;

    // количество переданных сущностей больше количества допустимых
    if (availableResolutions.length > availableResolutionCount) {
      errors.push({
        field: "availableResolutions",
        message: "Invalid availableResolutions field",
      });
      return errors;
    }

    for (let i = 0; i < availableResolutions.length; i++) {
      if (!availableResolutionDict[availableResolutions[i]]) {
        errors.push({
          field: "availableResolutions",
          message: `Invalid resolutions data - ${availableResolutions[i]}`,
        });
        break;
      }
    }
  }
  return errors;
};

export const updateVideoValidation = (data: UpdateVideoInput): BaseError[] => {
  const {
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate,
  } = data || {};

  const createFieldsErrors = createVideoValidation({
    title,
    author,
    availableResolutions,
  });

  const errors: BaseError[] = [];

  // ------- canBeDownloaded
  if (typeof canBeDownloaded !== "boolean") {
    errors.push({
      field: "canBeDownloaded",
      message: `Invalid field data`,
    });
  }

  // ------- minAgeRestriction
  if (minAgeRestriction !== null) {
    const isValidAge =
      Number.isInteger(minAgeRestriction) &&
      minAgeRestriction >= 1 &&
      minAgeRestriction <= 18;

    if (!isValidAge) {
      errors.push({
        field: "minAgeRestriction",
        message: "Invalid field data",
      });
    }
  }

  // -------- publicationDate
  const date = new Date(publicationDate);
  if (isNaN(date.getTime()) || publicationDate === null) {
    errors.push({
      field: "publicationDate",
      message: "Invalid date format",
    });
  }

  return errors.concat(createFieldsErrors);
};
