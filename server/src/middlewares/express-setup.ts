import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { CORS_REGEX } from "@config/keys";
import { adminJWTCookieParser, userJWTCookieParser } from "./jwtAuth";

export const setupMiddlewares = (app: Application) => {
  app.use(
    cors({
      origin: new RegExp(CORS_REGEX),
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: "Content-Type",
      credentials: true
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(adminJWTCookieParser);
  app.use(userJWTCookieParser);
};
