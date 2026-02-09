import { Response } from "express";

export const sendResponse = (
  res: Response,
  message: string,
  data?: any,
  statusCode: number = 200,
) => {
  const response = {
    message,
    ...(data !== undefined && { data }),
  };

  res.status(statusCode).send(response);
};
