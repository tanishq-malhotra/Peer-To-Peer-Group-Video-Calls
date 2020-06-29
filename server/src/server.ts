import express, { Application, Router } from "express";
import socketIO, { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import path from "path";

class Server {
  public httpServer: HTTPServer;
  public app: Application;
  public io: SocketIOServer;
  public router: Router;
  private readonly DEFAULT_PORT = 5000;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    this.app = express();
    this.router = express.Router();
    this.httpServer = createServer(this.app);
    this.io = socketIO(this.httpServer);

    // serving static files
    this.app.use(express.static(path.join(__dirname, "static")));
  }

  public mountRoutes(routesCallback: Function): void {
    routesCallback(this.router);
  }

  public mountIOServer(ioCallback: Function): void {
    ioCallback(this.io);
  }

  public async startServer(): Promise<any> {
    this.app.use("/", this.router);
    this.app.listen(this.DEFAULT_PORT, () => {
      console.log("server started at PORT: " + this.DEFAULT_PORT);
    });
  }
}

export default new Server();
