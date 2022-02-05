import fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import fastifyCors from 'fastify-cors';
import { RouteClass } from './interfaces';
import fastifyAuth from 'fastify-auth';
import { verify } from 'jsonwebtoken';

class App {
  private app: FastifyInstance;
  private port: string | number;
  constructor(routes: RouteClass[]) {
    this.app = fastify({ logger: true });
    this.port = process.env.PORT || 3000;
    this.initiateErrorHandler();
    this.initializeMiddlewares();
    this.initiateSwagger();
    this.initializeAuth();
    this.initiateRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }
  private async initializeMiddlewares() {
    await this.app.register(fastifyCors);
  }
  private async initiateRoutes(routes: RouteClass[]) {
    routes.forEach(route => {
      this.app.register(route.initializeRoutes, { prefix: route.path });
    });
  }

  private async initiateSwagger() {
    await this.app.register(fastifySwagger, {
      routePrefix: '/documentation',
      swagger: {
        info: {
          title: 'Test swagger',
          description: 'Testing the Fastify swagger API',
          version: '0.0.1',
        },
        securityDefinitions: {
          Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        },
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
      },
      exposeRoute: true,
    });
  }
  private async initiateErrorHandler() {
    this.app.setErrorHandler((error, req, res) => {
      req.log.error(error.toString());
      res.send({ error: { message: error.message } });
    });
  }
  private initializeAuth() {
    this.app.register(fastifyAuth).decorate('verifyJWT', async (req: FastifyRequest, res) => {
      console.log(req.headers['authorization']);
      if (!req.headers['authorization']) {
        throw new Error('UnAuthorized');
      }
      const token = req.headers['authorization'].substring('Bearer'.length).trim();
      const payload = verify(token, process.env.JWT_SECRET || 'SOME_SECRET');
      (req.context as any).user = payload.user;
    });
  }
}
export default App;
