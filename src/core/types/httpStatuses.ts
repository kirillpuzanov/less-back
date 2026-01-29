import { httpStatuses } from "../const/httpStatuses";

export type HttpStatus = (typeof httpStatuses)[keyof typeof httpStatuses];