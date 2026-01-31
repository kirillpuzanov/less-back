import { statuses } from "../const/statuses";

export type HttpStatus = (typeof statuses)[keyof typeof statuses];
