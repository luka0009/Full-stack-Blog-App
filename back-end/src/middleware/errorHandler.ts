import express, { Request, Response, NextFunction } from "express";

export const errorResponseHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 400;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export const invalidPathHandler = (req: Request, res: Response, next: NextFunction) => {
    let error = new Error("Invalid Path");
    //@ts-expect-error
    error.statusCode = 404;
    next(error);
  };