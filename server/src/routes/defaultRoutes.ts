import { Response, Request } from "express";

export const defaultRoutes = (router): void => {
  router.get("/", (req: Request, res: Response) => {
    res.sendFile("Hi from video call server");
  });
};
